#! /usr/bin/env python3

import boto3
from datetime import datetime
import gzip
import hashlib
import os
import sys
from typing import Any, Dict, Generator, Optional, Set, Tuple

PROFILE_NAME = "itoad-publisher"


def md5(file_path: str) -> str:
    hash = hashlib.md5()
    with open(file_path, 'rb') as f:
        for chunk in iter(lambda: f.read(4096), b""):
            hash.update(chunk)
    return hash.hexdigest()


def get_public_files(public: str) -> Generator[Tuple[str, str], None, None]:
    for root, _dirs, files in os.walk(public):
        for f in files:
            file_path = os.path.join(root, f)
            yield (file_path, md5(file_path))


def get_current_files(bucket: Any) -> Dict[str, str]:
    return {object.key: object.e_tag.replace('"', "") for object in bucket.objects.all()}


def get_files_to_upload(files: Dict[str, str], public_files: Generator[Tuple[str, str], None, None], public_dir: str) -> Generator[Tuple[str, str], None, None]:
    for f, hash in public_files:
        f_name = f.replace(public_dir, "")[1:]
        if f_name not in files:
            yield f, hash
        elif files[f_name] != hash:
            yield f, hash


class PreUpload:
    key: str
    local_file: str
    hash: str
    gzip: bool
    content_type: Optional[str]

    def __init__(self, file_path: str, hash: str, public_dir: str):
        self.local_file = file_path
        self.hash = hash
        self.key = file_path.replace(public_dir, "")[1:]
        if file_path[-5:] == '.html':
            self.gzip = True
            self.content_type = "text/html"
        elif file_path[-4:] == ".css":
            self.gzip = True
            self.content_type = "text/css"
        elif file_path[-3:] == ".js":
            self.gzip = True
            self.content_type = "application/javascript"
        else:
            self.gzip = False
            self.content_type = None

    def describe(self) -> str:
        return f"""
########
######  key='{self.key}',
######  local_file='{self.local_file}',
######  hash='{self.hash}',
######  gzip={self.gzip},
######  content_type={f"'{self.content_type}'" if self.content_type is not None else "[computed]"}
########
        """

    def write_to_bucket(self, bucket: Any):
        with open(self.local_file, 'rb') as f:
            f_bytes = f.read()
            if self.gzip:
                body = gzip.compress(f_bytes)
                bucket.put_object(
                    Key=self.key,
                    Body=body,
                    ContentEncoding="gzip",
                    ContentLength=len(body),
                    ContentType=self.content_type
                )
            else:
                bucket.put_object(
                    Key=self.key,
                    Body=f_bytes,
                    ContentLength=len(f_bytes)
                )


def invalidate_cache(boto_client: Any, distribution_id: str):
    cloudfront = boto_client.client("cloudfront")
    cloudfront.create_invalidation(
        DistributionId=distribution_id,
        InvalidationBatch={
            'Paths': {
                'Quantity': 2,
                'Items': ["/", "/*.html"]
            },
            'CallerReference': str(datetime.now())
        }
    )


def confirm_continue():
    user_input = input("Proceed? [y/N]: ")
    if user_input not in ["y", "Y", "yes", "YES"]:
        print("Exiting.")
        sys.exit(0)


def main(public_dir: str, bucket_name: str, distribution_id: Optional[str]) -> None:
    public = os.path.abspath(public_dir)
    print(f"bucket={bucket_name}")
    print(f"distribution_id={distribution_id}")
    print(f"profile={PROFILE_NAME}")
    print(f"public_dir={public}")

    confirm_continue()

    print("")

    if not os.path.isdir(public):
        print(f"{public} is not a directory.")
        sys.exit(1)

    print("Connecting to AWS S3.\n")
    session = boto3.session.Session(profile_name=PROFILE_NAME)
    s3 = session.resource("s3")
    itoad = s3.Bucket(bucket_name)
    itoad.load()

    print("Getting currently deployed files.\n")
    current_files = get_current_files(itoad)
    print("Getting built files.\n")
    public_files = get_public_files(public)

    print("Files to upload:")
    ps = [PreUpload(f, hash, public) for f, hash in get_files_to_upload(
        current_files, public_files, public)]
    for p in ps:
        print(p.describe())

    confirm_continue()

    for p in ps:
        print(f"Uploading {p.local_file} -> s3://{bucket_name}/{p.key}")
        p.write_to_bucket(itoad)

    print("Finished uploading.")

    if distribution_id is not None:
        print(f"Creating invalidation for distribution '{distribution_id}'.")
        invalidate_cache(session, distribution_id)
    else:
        print("No CloudFront distribution id provided, skipping cache invalidation.")


if __name__ == "__main__":
    public_dir = sys.argv[1]
    bucket_name = os.environ.get("BUCKET_NAME", "its-this-or-a-doughnut-test")
    distribution_id = os.environ.get("CACHE_ID", None)

    main(public_dir, bucket_name, distribution_id)

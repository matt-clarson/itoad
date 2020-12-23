#! /bin/bash

public_dir=$1;
publisher=itoad-publisher;
bucket=s3://its-this-or-a-doughnut;
staging_dir=/tmp/itoad/;

function get_target_uri () {
    echo $bucket$(echo $1 | sed "s|$staging_dir||g");
}

function publish () {
    target_uri=$(get_target_uri $1);
    echo "Publishing $1 to $target_uri" >> log 
    aws s3 cp $1 $target_uri --profile $publisher;
}

function publish_as () {
    target_uri=$(get_target_uri $1);
    echo "Publishing $1 to $target_uri" >> log
    aws s3 cp $1 $target_uri \
        --content-encoding gzip \
        --content-type $2 \
        --profile $publisher;
}

echo "Copying files to /tmp";

cp -R $public_dir $staging_dir;

echo "Gzip-ing html, css, and js files";

find -E $staging_dir \
    -type f \
    -regex ".*\.(js|css|html)$" \
    -exec gzip -9 -v "{}" \; \
    -exec mv "{}".gz "{}" \; ;

echo "Publishing html files";

for f in $(find -E $staging_dir -type f -regex ".*\.html$"); do
    publish_as $f text/html;
done

echo "Publishing css files";

for f in $(find -E $staging_dir -type f -regex ".*\.css$"); do
    publish_as $f text/css;
done

echo "Publishing js files";

for f in $(find -E $staging_dir -type f -regex ".*\.js$"); do
    publish_as $f application/javascript;
done

echo "Publishing all other files";

for f in $(find -E $staging_dir -type f -not -regex ".*\.(html|css|js)$"); do
    publish $f;
done

echo "Cleaning up";

rm -rf $staging_dir;

echo "Done!";

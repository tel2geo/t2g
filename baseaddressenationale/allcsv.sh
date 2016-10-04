#!/bin/sh
sed -i 1d *.csv &&
for i in `echo *.csv`; do
    cat $i >>  all.csv
done

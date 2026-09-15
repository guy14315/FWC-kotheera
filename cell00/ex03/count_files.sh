#!/bin/bash

sum=$(($(find . -maxdepth 1 ! -name . | wc -l)))
echo "$sum"

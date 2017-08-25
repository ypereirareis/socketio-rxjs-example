# Socket.io and RxJs

A simple script to show how to use socket.io with RxJs.

## Build docker image with node and yarn

```shell
docker build -t socketio-rxjs --no-cache . \
&& docker run -it --rm -v `pwd`:/app socketio-rxjs yarn install
```

## Start the container with the previously built image

```shell
docker run -it --rm socketio-rxjs
```

## Dev

For dev, do not forget to add a volume if you DO NOT want to rebuild the image after every updates in your files.

```shell
docker run -it --rm -v `pwd`:/app socketio-rxjs
```

## LICENSE

The MIT License (MIT)

Copyright (c) 2017 Yannick Pereira-Reis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
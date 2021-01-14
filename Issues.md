<!-- TODO terminal emulation tests https://gitlab.freedesktop.org/terminal-wg/esctest -->

<!-- interesting architecture for pty & websockets https://github.com/xtermjs/xterm.js/issues/2326#issuecomment-514713365 -->

<!-- interesting xterm buffer performance improvements https://github.com/xtermjs/xterm.js/issues/791 -->

<!-- interesting typed array performance improvements https://github.com/xtermjs/xterm.js/pull/1796 -->

<!-- interesting terminal emulator ttyd https://github.com/tsl0922/ttyd -->

<!-- interesting terminal emulator terminus https://github.com/Eugeny/terminus -->

<!-- TODO more test cases
https://gitlab.com/davidbittner/ansi-parser/-/blob/master/src/parsers/tests.rs
https://github.com/paultag/libansiescape/tree/master/tests/tests
 -->

<!-- TODO benchmark ideas
- ls -lR /usr/lib
- yes
- seq 1000000
 -->

<!-- TODO ansi escape links https://github.com/xtermjs/xterm.js/issues/1134 -->

<!-- TODO escape sequences https://github.com/xtermjs/xterm.js/issues/2797 -->

<!-- helpful:
showkey -a to get ascii output of keyboard shortcuts
 -->

<!-- TODO local echo https://github.com/xtermjs/xterm.js/issues/887 -->

<!-- TODO handle more keys
- https://github.com/xtermjs/xterm.js/issues/1426
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
- https://github.com/xtermjs/xterm.js/issues/2358
 -->

<!-- interesting: alacritty vte parser https://github.com/alacritty/vte -->

<!-- interesting terminal spec https://invisible-island.net/xterm/ctlseqs/ctlseqs.html -->

<!-- TODO test urandom -->

<!-- TODO investigate if desynchronized canvas can be faster https://developers.google.com/web/updates/2019/05/desynchronized -->

<!-- TODO chunking ws https://stackoverflow.com/questions/13010354/chunking-websocket-transmission -->

<!-- lines
UInt32[80]   [65, 66, 67, 68]

 -->

<!--
step 1

cursorYRelative = -25
cursorY = 0
bufferYStart = 0
bufferYEnd = 25

---------
insert one row
---------

step 2

cursorYRelative = -25
cursorY = 1
bufferYStart = 0
bufferYEnd = 26



step 24

cursorY = 26
bufferYStart = 1
bufferYEnd = 26


step 210

cursorY relative = 0
cursorY = 210 % 200 = 10
bufferYStart = 185
bufferYEnd = 210 % 200 = 10




 -->

<!-- TODO another color test http://jafrog.com/2013/11/23/colors-in-terminal.html
for code in {0..255}
    do echo -e "\e[38;5;${code}m"'\\e[38;5;'"$code"m"\e[0m"
  done

 -->

<!-- interesting hterm emulator https://github.com/chromium/hterm -->

<!-- interestin emulator shellinabox https://github.com/shellinabox/shellinabox -->

<!-- TODO copy escape code https://www.reddit.com/r/vim/comments/k1ydpn/a_guide_on_how_to_copy_text_from_anywhere/ -->

<!-- interesting terminal emulator jsterm https://github.com/pnitsch/jsTerm -->

<!-- interesting another terminal spec/info https://docs.microsoft.com/en-us/windows/console/console-virtual-terminal-sequences -->

<!-- another terminal spec/info https://man7.org/linux/man-pages/man4/console_codes.4.html -->

<!-- TODO e2e test for echo -e "\x1B[0;7m^C" -->

<!-- TODO test https://tforgione.fr/posts/ansi-escape-codes/ -->

<!-- TODO implement DECBKM (whatever that is) https://github.com/xtermjs/xterm.js/issues/3041 -->

<!-- TODO test with cal, less -->

<!-- TODO parseArray speed was at 8.07ms https://github.com/SimonSiefke/termterm/commit/56e67ccf70f86f1fb0bcb75565c2b4c94d803329
now at 12-13ms https://github.com/SimonSiefke/termterm/commit/d270d0e52751962fe3166a8ed4c8145eaeef7e22

exact stats

5ccc423282d7 10.833993209052831
cfd77ef50f67 10.645527818990871
83086d03b316 10.58643708699383
9ece0d0b98ec 10.564834960982203
7e50a36af1aa 10.605576498022304
079947c40022 10.159999413037673
b586596ece86 10.135477512039245
063fb89036b2 10.041848268996924
7dd56c45e815 10.145523060981184
04f817ea9518 10.256311563989147
5c78b97d610a 10.232704843970016
8eb050e07779 10.195907104989514
2b765574a5a5 10.174192882023751
929ce46cd8d3 10.172250303972513
d2657d7b4e87 10.203273216011002
dd22b5888fe7 10.143118003020064
dfb4db53f20e 12.5115863800589
0f4e4a400aa9 11.397626570982858
4a8d295ea3fb 11.4525383279901
900e962246d9 11.453580678990111
481a589ada2a 10.850747135020793
2af13f5fce7a 10.854436228968202
d76efa95fc16 10.992791731968522
768a8dd0aa82 10.884783417981119
210f30a8c564 10.778459625024349
7318ea2b4517 10.855568305995316
57c674fdb2f8 10.985191448030994
05e2f9a80114 10.744631976950913
642d07580a20 10.869363724989817
74218b123ac7 10.875557132009417
04b93bfb8b49 11.021165261983871
d768306432f0 10.92493555500917
ebbf61bbb6d7
85317883993c
e616e52ef858
c40535363313
3c8c9a84cc26
51e18ef695a8
f8b1663b09dd
f6f4971d4fea
5d0103799740
2c752aaf6850
e827eea1693e
5fd236ad7f4c
682adc233db9
e60394fa94c0
26c19f613f6a
3f10716a053f 5.726098671965301
56e67ccf70f8 6.247791955998167
e0bef2eaed74
972f3e8b1b55
70d52800cb90
4d028265db48
47a128e681dc
67af80afdfdb
adccd6c58107
11b06f413b60
11cc61974be0
c4a185f1f64e 7.190353323988616
0239e3833c8d 7.156722218986601
982d3b6929f7 7.127980254966766
070b5effa098 7.152418240005151
801d1028ec5e 7.136260629002005
931973edc45c 7.180986151963473
fccaaef0af9d 6.225066935008392
d045602c284e 6.191209027986973
63817317d6ca 6.204319035006687
e462a4af4960 6.258859021985903
446bd7a32ef6 6.2274600749500095
f114db4ef2ce 6.216048497989774
1ccddf9bbead 6.1922221880070865
0f109c750b4a 6.226201661001891
3d60d91af037 6.99255389103666
bf91d79cc419 6.960915291013196
fe413d9814c5 6.98562460898608
ea8120ab7986 6.9884451570175585
06d6ebc02ad7 6.9947911850214
9bf8f95fb7fc 6.949904896026477
855c54062a9c 6.959755888009444
747692ea1472 6.928712788963691
b068f2379c4f 6.940445188991726
733c98e9ebcb 6.935052064981312
a97d116050b0 6.931273918004707
bef136ae14cb 6.928982452996075
7a0f6753936f 6.942478538023308
146daaf50bbf 6.9468849350065
76a54ea8e9b9 6.931086391022429
ccdec8707800 6.94970856500417
0d01879e6639 6.9783331280108545
4d0e5adabf93
2b8a7182baea
57aed0640e6c
0dad59d6af94
43d4eb074514
4489a1a566bc
2785df9c82aa
b30bb4945d05
68dcdd55b25d
45b808c3109d
db7adc5cba45
a02d4e672f99
1e5c05bfb85e
ead4c9e11e68
f8accb307c66
2924bfedac3b
7164aa466cbf
869a2ddfaa66
a2c2ed791961
6d3532e12d63



 -->

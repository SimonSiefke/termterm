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
 -->

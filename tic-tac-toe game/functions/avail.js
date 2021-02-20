const avail = reboard =>
  reboard
    .map((_, index) => (_ === " " ? index : _))
    .filter(_ => _ != "x" && _ != "o");
const avail = reboard => reboard.map((_, index) => { if (_ === ' ') return index; else return _ }).filter(s => s != "x" && s != "o")
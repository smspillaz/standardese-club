$(function() {
    var grammar = new Baba.Grammar('standardese', ['{', '}'], ['[', ']']);

    grammar.require('common');
    grammar.addGrammar({
        'sentence': ['{statement}'],
        'noun': {
            'cpp': '[null|character|string|literal|block|trigraph|newline|keyword|digit|identifier|name|suffix|macro|template|class|pragma|token|module|include|header|list|initializer|type|lvalue|rvalue|reference|pointer|cast|integer|specifier|operator|definition|declaration|element|sequence-point|constant|ivar|accessor|property|member|function]'
        },
        'adjective': {
            'cpp': '[const|static|virtual|extern|emitted|initializer|ambiguous|floating-point|fixed-point|non-static|mutable|umbrella|unicode|binary|raw]'
        },
        'state': {
            'cpp': '[undefined|ambiguous|dangerous|memory-mapped|volatile|mutable]'
        },
        'verb': {
            'cpp': '[preserved|curried|optimized|flushed]'
        },
        'extension': '[cpp|cxx|hxx|cc]',
        'filename': '[curry|arg|mem|data|struct|list|func|window|web|net|panel|math|util|meta].{extension}',
        'statement': [
            '{adjective.cpp} {noun.cpp} left in a {state.cpp} state',
            '{adjective.cpp} {noun.cpp} {verb.cpp} in {adjective.cpp} {noun.cpp}',
            '{noun.cpp} and [{adjective.cpp} |]{noun.cpp} would cause {noun.cpp} to be {verb.cpp}',
            '{noun.cpp} ignored',
            'no {adjective.cpp} {noun.cpp} at end of {noun.cpp}',
            'incomplete {adjective.cpp} {adjective.cpp} {noun.cpp} in {noun.cpp} kept in {state.cpp} state',
            '{adjective.cpp} {noun.cpp} is only valid in C[99|89] or C++[98|11|14|1y|0x|1z] [treating {verb.cpp} {noun.cpp} as {adjective.cpp} {noun.cpp}| ]'
        ],
        'type': '[warning|error]'
    });

    function randomIntBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var baba = new Baba.Parser('standardese');
    var filename = baba.render('filename');
    var numLines = randomIntBetween(400, 2000);
    var lines = [];

    var buildingWindow = $('.building-window');

    var numSuccessFiles = randomIntBetween(2, 5);
    var percentageStart = randomIntBetween(3, 80);

    var appendFuncs = [];

    for (var renderFileIndex = 0; renderFileIndex < numSuccessFiles; ++renderFileIndex) {
        appendFuncs.push(function() {
            /* Save the renderIndex here inside this closure. */
            var renderIndex = renderFileIndex;

            return function() {
                buildingWindow.append($('<p class="code cmake-compiling">' +
                                      "[" +
                                      (percentageStart + renderIndex) +
                                      "%] Building CXX object " +
                                      baba.render('filename') + '</p>'));
            }
        }());
    }

    appendFuncs.push(function() {
        buildingWindow.append($('<p class="code cmake-compiling">' +
                              "[" +
                              (percentageStart + renderFileIndex) +
                              "%] Building CXX object " +
                              filename + '</p>'));
    });

    appendFuncs.push(function() {
        for (var lineIndex = 0; lineIndex < numLines; ++lineIndex) {
            if (Math.random() < 0.1) {
                var msg = [
                    filename + ':' + lineIndex,
                    baba.render('type') + ':',
                    ' ',
                    baba.render('sentence')
                ].join(' ');
                buildingWindow.append($('<p class="code msg">' + msg + "</p>"));
            }
        }
    });

    var appendFuncsIndex = 0;
    var timeout = window.setInterval(function() {
        appendFuncs[appendFuncsIndex]();
        appendFuncsIndex++;

        if (appendFuncsIndex >= appendFuncs.length) {
            window.clearTimeout(timeout);
        }
    }, randomIntBetween(600, 1500));
});
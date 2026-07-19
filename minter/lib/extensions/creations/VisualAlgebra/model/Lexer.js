import { ExtendedObject } from '../../../../core/classes/ExtendedObject.js';
export class Lexer extends ExtendedObject {
    lex(str) {
        return this.stringToSentence(str);
    }
    stringToSentence(str) {
        // default implementation: Polish notation
        return this.stringToPolish(str);
    }
    sentenceToString(sent) {
        return this.polishToString(sent);
    }
    stringToPolish(str) {
        return str.split(' ');
    }
    polishToString(sent) {
        return sent.join(' ');
    }
    defaults() { return {}; }
    mutabilities() { return {}; }
}
//# sourceMappingURL=Lexer.js.map
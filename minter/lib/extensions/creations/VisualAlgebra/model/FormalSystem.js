import { FormalLanguage } from './FormalLanguage.js';
export class FormalSystem extends FormalLanguage {
    defaults() {
        return {
            inferenceRules: {}
        };
    }
    applyRuleToTree(ruleName, tree) {
        let rule = this.inferenceRules[ruleName];
        if (rule === undefined) {
            throw `Unknown inference rule ${ruleName}`;
        }
        let record = this.matchSentenceTreeForm(rule[0], tree);
        if (record === null) {
            return null;
        }
        let newTree = this.insert(record, rule[1]);
        return newTree;
    }
    applicableRules(tree) {
        let result = {};
        for (let [name, rule] of Object.entries(this.inferenceRules)) {
            let record = this.matchSentenceTreeForm(rule[0], tree);
            if (record !== null) {
                result[name] = rule;
            }
        }
        return result;
    }
    mutabilities() { return {}; }
}
//# sourceMappingURL=FormalSystem.js.map
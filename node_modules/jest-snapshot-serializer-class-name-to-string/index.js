/* eslint prefer-template: 0 */
/* eslint no-use-before-define: ["error", { functions: false }] */
const reactTestInstance = Symbol.for('react.test.json');

function escapeHTML(str) {
    return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function printChildren(children, print, indent, colors, opts) {
    return children
        .map(child => printInstance(child, print, indent, colors, opts))
        .join(opts.edgeSpacing);
}

function printProps(props, print, indent, colors, opts) {
    return Object.keys(props).sort().map((name) => {
        const prop = props[name];
        let printed = print(prop);

        if (typeof prop !== 'string') {
            if (name === 'className') {
                printed = print(prop.toString());
            } else if (printed.indexOf('\n') !== -1) {
                printed =
                    '{' +
                    opts.edgeSpacing +
                    indent(indent(printed) + opts.edgeSpacing + '}');
            } else {
                printed = '{' + printed + '}';
            }
        }

        return (
            opts.spacing +
            indent(colors.prop.open + name + colors.prop.close + '=') +
            colors.value.open +
            printed +
            colors.value.close);
    }).join('');
}

function printInstance(instance, print, indent, colors, opts) {
    if (typeof instance === 'number') {
        return print(instance);
    } else if (typeof instance === 'string') {
        return colors.content.open + escapeHTML(instance) + colors.content.close;
    }

    let closeInNewLine = false;
    let result = colors.tag.open + '<' + instance.type + colors.tag.close;

    if (instance.props) {
        closeInNewLine = !!Object.keys(instance.props).length && !opts.min;
        result += printProps(instance.props, print, indent, colors, opts);
    }

    if (instance.children) {
        const children = printChildren(
            instance.children,
            print,
            indent,
            colors,
            opts
        );

        result +=
            colors.tag.open + (
                closeInNewLine ? '\n' : '') +
            '>' +
            colors.tag.close +
            opts.edgeSpacing +
            indent(children) +
            opts.edgeSpacing +
            colors.tag.open +
            '</' +
            instance.type +
            '>' +
            colors.tag.close;
    } else {
        result +=
            `${colors.tag.open}${closeInNewLine ? '\n' : ' '}/>${colors.tag.close}`;
    }

    return result;
}

const print = (val, print, indent, opts, colors) => printInstance(val, print, indent, colors, opts);

const test = object => object && object.$$typeof === reactTestInstance;

module.exports = { print, test };

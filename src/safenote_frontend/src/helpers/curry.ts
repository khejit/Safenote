export default function curry (func) {
    return function(args) {
        return args.reduce((acc, arg) => func(acc, arg))
    }
}
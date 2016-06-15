class ProxyFactory {
    static create(obj, props, action) {
        return new Proxy(obj, {
            get(target, prop, receiver) {
                if (props.includes(prop) && ProxyFactory._isFunction(target[prop])) {
                    return function() {
                        Reflect.apply(target[prop], target, arguments);
                        return action(target);
                    }
                }
                return Reflect.get(target, prop, receiver);
            },

            set(target, prop, value, receiver) {
                if (props.includes(prop))
                    action(target);
                return Reflect.set(target, prop, value, receiver);
            }
        });
    }

    static _isFunction(func) {
        return typeof(func) === 'function';
    }
}

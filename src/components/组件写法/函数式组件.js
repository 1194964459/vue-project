import { createVNode } from 'vue'

// 函数式组件（返回 VNode）
const FunctionalComponent = (props, context) => {
    // h 函数用于创建 VNode，而非字符串
    return createVNode('div', { class: 'functional-component' }, [
        createVNode('p', `接收的内容: ${props.message}`),
        context.slots.default() // 渲染插槽内容
    ])
}

FunctionalComponent.props = ['message']
export default FunctionalComponent
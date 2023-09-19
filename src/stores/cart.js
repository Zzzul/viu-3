import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', () => {
    const carts = ref([])
    const discount = ref(0)
    const paid = ref(0)
    const customer = ref('')
    const card = ref('')
    const cardInformation = ref({})
    const multiPayment = ref([])
    const holdCarts = ref([])

    const addToCart = (product) => {
        const index = carts.value.findIndex((item) => item.id === product.id)

        if(index !== -1) {
            if(carts.value[index].quantity < product.stock) {
                carts.value[index].quantity++
            }else{
                carts.value[index].quantity = product.stock

                alert('Product is out of stock')
            }
        } else {
            carts.value.push({
                ...product,
                discount: 0,
                quantity: 1
            })
        }
    }

    const countSubTotal = computed(() => {
        return parseInt(carts.value.reduce((acc, item) => acc + (item.discount ? item.discount : item.price) * item.quantity, 0))
    })

    const clearCart = () => {
        carts.value = []
        discount.value = 0
        paid.value = 0
        customer.value = ''
        card.value = ''
        cardInformation.value = {}
    }

    const removeItem = (id) => {
        carts.value = carts.value.filter((item) => item.id !== id)
    }

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value)
    }

    const incrementQuantity = (id) => {
        const index = carts.value.findIndex((item) => item.id === id)

        if(carts.value[index].quantity < carts.value[index].stock) {
            carts.value[index].quantity++
        }else{
            alert('Product is out of stock')
        }
    }

    const decrementQuantity = (id) => {
        const index = carts.value.findIndex((item) => item.id === id)

        if(carts.value[index].quantity > 1) {
            carts.value[index].quantity--
        }

        if(carts.value[index].quantity === 1) {
            removeItem(id)
        }
    }

    const countGrandTotal = computed(() => {
        return  parseInt(countSubTotal.value - discount.value)
    })

    const countChange = computed(() => {
        if(paid.value == 0){
            return 0
        }

        return parseInt(paid.value - countGrandTotal.value)
    })

    const isCanSave = computed(() => {
        if(countGrandTotal.value == 0){
            return false
        }

        if(carts.value.length == 0){
            return false
        }

        if(countGrandTotal.value > paid.value){
            return false
        }

        return true
    })

    const autoPayment = () => {
        paid.value = countGrandTotal.value
    }

    const removeDiscountItem = (index) => {
        carts.value[index].discount = 0
    }

    const save = () => {
        if(carts.value.length == 0){
            alert('Cart is empty')
            return
        }

        if(customer.value == ''){
            alert('Customer is empty')
            return
        }

        console.log(
            carts.value,
            discount.value,
            paid.value,
            customer.value,
            countGrandTotal.value,
            countChange.value,
            countSubTotal.value
        )
        clearCart()
        alert('Order has been saved')
    }

    const addMultiPayment = (data) => {
        multiPayment.value.push(data)
    }

    const selectCard = (data) => {
        if(!data){
            cardInformation.value = {}
            card.value = ''
            return
        }

        card.value = data
        autoPayment()
    }

    const addToHoldCart = () => {
        if(carts.value.length == 0){
            alert('Cart is empty')
            return
        }

        holdCarts.value.push({
            carts: carts.value,
            discount: discount.value,
            paid: paid.value,
            customer: customer.value,
            card: card.value,
            cardInformation: cardInformation.value
        })

        clearCart()
    }

    const selectHoldCart = (index) => {
        carts.value = holdCarts.value[index].carts
        discount.value = holdCarts.value[index].discount
        paid.value = holdCarts.value[index].paid
        customer.value = holdCarts.value[index].customer
        card.value = holdCarts.value[index].card
        cardInformation.value = holdCarts.value[index].cardInformation

        holdCarts.value.splice(index, 1)
    }

    const removeHoldCart = (index) => {
        holdCarts.value.splice(index, 1)
    }

    return {
        carts,
        addToCart,
        countSubTotal,
        clearCart,
        removeItem, 
        formatCurrency,
        incrementQuantity,
        decrementQuantity,
        discount,
        paid,
        countGrandTotal,
        countChange,
        autoPayment,
        isCanSave,
        customer,
        removeDiscountItem,
        save,
        card,
        multiPayment,
        addMultiPayment,
        selectCard,
        cardInformation,
        holdCarts,
        addToHoldCart,
        selectHoldCart,
        removeHoldCart
    }
})

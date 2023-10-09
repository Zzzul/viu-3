import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'

export const useCartStore = defineStore('cart', () => {
    const carts = ref([])
    const discount = ref(0)
    const paid = ref(0)
    const customer = ref('')
    const card = ref('')
    const cardInformation = ref({})
    const multiPayment = ref([])
    const holdCarts = ref([])
    const toast = useToast()

    const countGrandTotal = computed(() => {
        return parseInt(countSubTotal.value - discount.value)
    })

    const countChange = computed(() => {
        if (paid.value == 0) {
            return 0
        }

        if (countGrandTotal.value == 0) {
            return 0
        }

        if (discount.value >= countGrandTotal.value) {
            return 0
        }

        return parseInt(paid.value - countGrandTotal.value)
    })

    const isCanSave = computed(() => {
        // if (countGrandTotal.value == 0) {
        //     return false
        // }

        if (carts.value.length == 0) {
            return false
        }

        if (countGrandTotal.value > paid.value) {
            return false
        }

        return true
    })

    const countSubTotal = computed(() => {
        return parseInt(carts.value.reduce((acc, item) => acc + (item?.isFree ? 0 : (item?.discount ? item.discount : item.price)) * item.quantity, 0))
    })

    /**
     * Adds a product to the cart.
     *
     * @param {object} product - The product to be added to the cart.
     */
    const addToCart = (product) => {
        const index = carts.value.findIndex((item) => item.id === product.id)

        if (index !== -1) {
            if (carts.value[index].quantity < product.stock) {
                carts.value[index].quantity++
            } else {
                carts.value[index].quantity = product.stock

                toast.warning('Product is out of stock')
            }
        } else {
            carts.value.push({
                ...product,
                isFree: false,
                discount: 0,
                quantity: 1
            })
        }
    }

    /**
     * Clears the cart and resets all associated values.
     */
    const clearCart = () => {
        carts.value = []
        discount.value = 0
        paid.value = 0
        customer.value = ''
        card.value = ''
        cardInformation.value = {}
    }

    /**
     * Remove an item from the carts array based on its id.
     *
     * @param {type} id - the id of the item to be removed
     * @return {type} void
     */
    const removeItem = (id) => {
        carts.value = carts.value.filter((item) => item.id !== id)
    }

    /**
     * Formats a given value as currency.
     *
     * @param {number} value - The value to format as currency.
     * @return {string} The formatted currency value.
     */
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(value)
    }

    /**
     * Increment the quantity of a product in the cart.
     *
     * @param {number} id - The ID of the product.
     * @return {void} No return value.
     */
    const incrementQuantity = (id) => {
        const index = carts.value.findIndex((item) => item.id === id)

        if (carts.value[index].quantity < carts.value[index].stock) {
            carts.value[index].quantity++
        } else {
            toast.warning('Product is out of stock')
        }
    }

    /**
 * Decrements the quantity of an item in the cart.
 *
 * @param {number} id - The ID of the item to decrement.
 */
    const decrementQuantity = (id) => {
        const index = carts.value.findIndex((item) => item.id === id)

        if (carts.value[index].quantity > 1) {
            carts.value[index].quantity--
        }

        if (carts.value[index].quantity === 1) {
            removeItem(id)
        }
    }

    /**
     * Sets the value of `paid` to the value of `countGrandTotal`.
     *
     * @return {void} No return value.
     */
    const autoPayment = () => {
        paid.value = countGrandTotal.value
    }

    /**
     * Removes the discount item at the specified index in the carts array.
     *
     * @param {number} index - The index of the discount item to remove.
     */
    const removeDiscountItem = (index) => {
        carts.value[index].discount = 0
        carts.value[index].isFree = false
    }

    /**
     * Saves the order if the cart is not empty and the customer is not empty.
     *
     * @return {void} No return value.
     */
    const save = () => {
        if (carts.value.length == 0) {
            toast.warning('Cart is empty')
            return
        }

        if (customer.value == '') {
            toast.warning('Customer is empty')
            return
        }

        clearCart()
        toast.success('Order has been saved')
    }

    /**
     * Adds a payment to the multiPayment array.
     *
     * @param {array|object} data - the payment data to be added
     * @return {void} void
     */
    const addMultiPayment = (data) => {
        multiPayment.value.push(data)
    }

    /**
     * Selects a card and performs an automatic payment.
     *
     * @param {array|object} data - The data used to select the card.
     * @return {void} This function does not return a value.
     */
    const selectCard = (data) => {
        if (!data) {
            cardInformation.value = {}
            card.value = ''
            return
        }

        card.value = data
        autoPayment()
    }

    /**
     * Adds the current cart to the hold cart list.
     *
     * @return {void} 
     */
    const addToHoldCart = () => {
        if (carts.value.length == 0) {
            toast.warning('Cart is empty')
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

    /**
     * Selects a hold cart at the specified index and updates the values of `carts`, `discount`, `paid`, `customer`, `card`, and `cardInformation` with the values from the selected hold cart. Then, removes the selected hold cart from the `holdCarts` array.
     *
     * @param {number} index - The index of the hold cart to be selected.
     * @return {void} This function does not return a value.
     */
    const selectHoldCart = (index) => {
        carts.value = holdCarts.value[index].carts
        discount.value = holdCarts.value[index].discount
        paid.value = holdCarts.value[index].paid
        customer.value = holdCarts.value[index].customer
        card.value = holdCarts.value[index].card
        cardInformation.value = holdCarts.value[index].cardInformation

        holdCarts.value.splice(index, 1)
    }

    /**
     * Removes a cart from the holdCarts array at the specified index.
     *
     * @param {number} index - The index of the cart to remove.
     * @return {void} This function does not return anything.
     */
    const removeHoldCart = (index) => {
        holdCarts.value.splice(index, 1)
    }

    const setToFree = (index) => {
        carts.value[index].discount = 0
        carts.value[index].isFree = !carts.value[index].isFree
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
        removeHoldCart,
        setToFree
    }
},
    {
        persist: true
    })

import { useAuthStore } from "@/stores/auth"
import { useRedirectStore } from "@/stores/redirect"

export default (to, from, next) => {
    const titleFromParams = to.params?.pageTitle

    if (titleFromParams) {
        document.title = `${titleFromParams} - ${document.title}`
    } else {
        document.title = to.meta?.title ?? 'Home'
    }

    const authStore = useAuthStore()
    const redirectStore = useRedirectStore()

    let exceptionalRoutes = ['login', 'register', 'forgot-password', 'home']
    let isGoingExceptionalRoutes = exceptionalRoutes.includes(to.name)

    /**
     * IF THE USER IS NOT LOGGED IN
     */
    if (!authStore.isLoggedIn) {
        if (isGoingExceptionalRoutes) {
            next() // The user is not logged in but it's going to exceptional routes ? fine
            return
        } else {
            next({ name: 'login' })
            redirectStore.setRedirectTo(to)
            return
        } // other routes than exceptional paths => /login
    }

    /**
     * IF THE USER IS LOGGED IN
     */
    // if (authStore.isLoggedIn && isGoingExceptionalRoutes) {
    //     next({ name: 'home', query: { 'redirect-reason': 'already logged' } })
    // } else {
    //     next()
    // }

    next()
}
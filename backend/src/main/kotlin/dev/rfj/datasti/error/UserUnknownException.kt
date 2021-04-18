package dev.rfj.datasti.error

import java.lang.RuntimeException

private fun getMessage(userId: String): String =
        if (userId.isBlank()) "User unknown!" else "User '$userId' unknown!"

class UserUnknownException(userId: String = "") : RuntimeException(getMessage(userId))
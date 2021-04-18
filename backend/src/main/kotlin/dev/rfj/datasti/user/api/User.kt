package dev.rfj.datasti.user.api

data class User(
        val firstname: String,
        val lastname: String,
        val username: String,
        val password: String
) {
    constructor(username: String, password: String): this(
            username = username,
            password = password,
            firstname = "",
            lastname = ""
    )
}

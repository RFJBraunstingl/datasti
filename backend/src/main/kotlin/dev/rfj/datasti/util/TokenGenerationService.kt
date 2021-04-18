package dev.rfj.datasti.util

interface TokenGenerationService {

    fun generateJWTUserToken(userId: String): String
}
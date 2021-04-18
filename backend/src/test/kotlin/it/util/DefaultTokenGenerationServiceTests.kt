package it.util

import dev.rfj.datasti.util.TokenGenerationService
import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Assertions.assertFalse
import org.junit.jupiter.api.Test
import javax.inject.Inject

@QuarkusTest
class DefaultTokenGenerationServiceTests {

    @Inject
    private lateinit var tokenGenerator: TokenGenerationService

    @Test
    fun testTokenGeneration() {
        val token = tokenGenerator.generateJWTUserToken("user")
        assertFalse(token.isBlank())
    }
}
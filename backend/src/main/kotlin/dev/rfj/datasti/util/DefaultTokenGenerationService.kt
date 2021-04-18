package dev.rfj.datasti.util

import io.smallrye.jwt.build.Jwt
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class DefaultTokenGenerationService: TokenGenerationService {

    override fun generateJWTUserToken(userId: String): String {
        return Jwt.issuer("https://github.com/Lippeck/Datasti")
                .upn(userId)
                .groups(HashSet(listOf("User")))
                .sign()
    }
}

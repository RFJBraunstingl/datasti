package dev.rfj.datasti.container.repository

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.error.InsertionFailedException

internal interface ContainerRepository {

    fun findByUserId(userId: String): Set<Container>

    @Throws(InsertionFailedException::class)
    fun save(container: Container, userId: String)
}
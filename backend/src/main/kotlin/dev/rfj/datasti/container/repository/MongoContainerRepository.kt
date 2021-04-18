package dev.rfj.datasti.container.repository

import com.mongodb.client.MongoClient
import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.toContainer
import dev.rfj.datasti.container.api.toDocument
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
internal class MongoContainerRepository(
        private val mongoClient: MongoClient
): ContainerRepository {

    override fun findByUserId(userId: String): Set<Container> {
        val result = mutableSetOf<Container>()

        return getContainerDB()
                .getCollection(userId)
                .find()
                .map { it.toContainer() }
                .toCollection(result)
    }

    private fun getContainerDB() = mongoClient.getDatabase("datasti_containers")

    override fun save(container: Container, userId: String) {
        getContainerDB()
                .getCollection(userId)
                .insertOne(container.toDocument())
    }
}
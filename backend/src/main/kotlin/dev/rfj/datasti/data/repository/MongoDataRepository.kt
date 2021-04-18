package dev.rfj.datasti.data.repository

import com.mongodb.client.FindIterable
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import dev.rfj.datasti.data.api.Datapoint
import dev.rfj.datasti.data.api.toDatapoint
import dev.rfj.datasti.data.api.toDocument
import dev.rfj.datasti.error.InsertionFailedException
import org.bson.Document
import javax.enterprise.context.ApplicationScoped

@ApplicationScoped
class MongoDataRepository(
        private val mongoClient: MongoClient
) : DataRepository {

    override fun list(containerName: String, userId: String): List<Datapoint> {
        val result = getCollection(containerName, userId).find() ?: return emptyList()
        return sortedIterator(result).toDataList()
    }

    private fun sortedIterator(result: FindIterable<Document>): Iterator<Document> {
        val byTimestampAsc = Document().append("timestamp", 1)
        return result.sort(byTimestampAsc).iterator()
    }

    private fun Iterator<Document>.toDataList(): List<Datapoint> {
        val result = mutableListOf<Datapoint>()
        this.forEach { result.add(it.toDatapoint()) }
        return result
    }

    override fun save(datapoint: Datapoint, containerName: String, userId: String): String {

        val result = getCollection(containerName, userId)
                .insertOne(datapoint.toDocument()) ?: throw InsertionFailedException()

        if (!result.wasAcknowledged())
            throw InsertionFailedException()

        return result.insertedId?.asObjectId()?.value?.toHexString() ?: throw InsertionFailedException()
    }

    private fun getCollection(containerName: String, userId: String): MongoCollection<Document> {
        return mongoClient.getDatabase("data")
                .getCollection("$userId:$containerName")
    }
}

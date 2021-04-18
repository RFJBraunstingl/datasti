package dev.rfj.datasti.data.repository

import com.mongodb.client.*
import com.mongodb.client.result.InsertOneResult
import dev.rfj.datasti.error.InsertionFailedException
import dev.rfj.datasti.data.api.toDocument
import org.bson.BsonObjectId
import org.bson.Document
import org.bson.types.ObjectId
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import util.randomDatapoint

const val TEST_CONTAINER = "test"
const val TEST_USER = "user"

class MongoDataRepositoryTests {

    private lateinit var mongoClient: MongoClient
    private lateinit var dataDB: MongoDatabase
    private lateinit var containerCollection: MongoCollection<Document>

    private lateinit var repository: DataRepository

    @BeforeEach
    fun setup() {
        mockMongoClient()

        repository = MongoDataRepository(mongoClient)
    }

    private fun mockMongoClient() {
        mongoClient = mock(MongoClient::class.java)
        containerCollection = mock(MongoCollection::class.java) as MongoCollection<Document>
        dataDB = mock(MongoDatabase::class.java)

        doReturn(InsertOneResult.acknowledged(BsonObjectId(ObjectId())))
                .`when`(containerCollection).insertOne(any())
        doReturn(containerCollection).`when`(dataDB).getCollection("$TEST_USER:$TEST_CONTAINER")
        doReturn(dataDB).`when`(mongoClient).getDatabase("data")
    }

    @Test
    fun testSave() {
        val dataPoint = randomDatapoint()
        val containerName = TEST_CONTAINER
        val userId = TEST_USER

        repository.save(dataPoint, containerName, userId)

        verify(containerCollection, times(1))
                .insertOne(dataPoint.toDocument())
    }

    @Test
    fun testSavingFailsIfResultIsNotAcknowledged() {
        doReturn(InsertOneResult.unacknowledged())
                .`when`(containerCollection).insertOne(any())

        assertInsertThrowsInsertFailedException()
    }

    @Test
    fun testIdIsReturned() {
        val expected = ObjectId.get().toHexString()
        val result = InsertOneResult.acknowledged(BsonObjectId(ObjectId(expected)))
        val data = randomDatapoint()

        doReturn(result).`when`(containerCollection).insertOne(data.toDocument())

        val actual = repository.save(data, TEST_CONTAINER, TEST_USER)

        assertEquals(expected, actual)
    }

    @Test
    fun testMissingIdThrowsException() {
        doReturn(null).`when`(containerCollection).insertOne(any())

        assertInsertThrowsInsertFailedException()
    }

    @Test
    fun testForNull() {
        doReturn(InsertOneResult.acknowledged(null))
                .`when`(containerCollection).insertOne(any())

        assertInsertThrowsInsertFailedException()
    }

    private fun assertInsertThrowsInsertFailedException() {
        assertThrows<InsertionFailedException> {
            performInsert()
        }
    }

    private fun performInsert() {
        repository.save(randomDatapoint(), TEST_CONTAINER, TEST_USER)
    }

    @Test
    fun testDataRetrieval() {
        val searchResult = mock(FindIterable::class.java) as FindIterable<Document>
        doReturn(mock(MongoCursor::class.java)).`when`(searchResult).iterator()
        doReturn(searchResult).`when`(searchResult).sort(any())
        doReturn(searchResult).`when`(containerCollection).find()

        repository.list(TEST_CONTAINER, TEST_USER)

        verify(containerCollection, times(1)).find()
    }
}
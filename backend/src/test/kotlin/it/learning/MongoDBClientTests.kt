package it.learning

import com.mongodb.client.MongoClient
import com.mongodb.client.MongoCollection
import com.mongodb.client.MongoDatabase
import io.quarkus.test.junit.QuarkusTest
import org.apache.commons.lang3.RandomStringUtils
import org.bson.Document
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test
import javax.inject.Inject

@QuarkusTest
class MongoDBClientTests {

    @Inject
    lateinit var mongoClient: MongoClient

    @Test
    fun testGettingDatabaseWorks() {
        val db = getRandomDatabase()

        assertNotNull(db)
    }

    @Test
    fun testGettingCollectionWorks() {
        val collection = getRandomCollection()

        assertNotNull(collection)
    }

    private fun getRandomDatabase(): MongoDatabase {
        val randomString = RandomStringUtils.randomAlphabetic(20)
        return mongoClient.getDatabase(randomString)
    }

    fun getRandomCollection(): MongoCollection<Document> {
        val randomString = RandomStringUtils.randomAlphabetic(20)
        return getRandomDatabase().getCollection(randomString)
    }

    @Test
    fun testInsertingOneDocument() {
        val doc = Document().append("name", "test")
        mongoClient.getDatabase("test")
                .getCollection("test")
                .insertOne(doc)
    }

    @Test
    fun testInsertingDocuments() {
        val randomCollection = getRandomCollection()

        val doc1 = Document().append("name", "alpha")
        val doc2 = Document().append("name", "bravo")
        val doc3 = Document().append("name", "charly")

        randomCollection.insertOne(doc1)
        randomCollection.insertOne(doc2)
        randomCollection.insertOne(doc3)

        assertEquals(3, randomCollection.find().count())
    }

    @Test
    fun testFindingDocuments() {
        val collection = getRandomCollection()

        val doc = Document()
                .append("name", "test")
                .append("attr", "secret")
        collection.insertOne(doc)

        val result = collection.find(Document().append("name", "test"))

        assertEquals(1, result.count())
        val found = result.single()
        assertEquals("test", found["name"])
        assertEquals("secret", found["attr"])
    }

    @Test
    fun testFindingInNoise() {
        val collection = getRandomCollection()

        collection.insertOne(Document().append("name", "test"))
        collection.insertOne(Document().append("name", "tes"))
        collection.insertOne(Document().append("name", "testt"))
        collection.insertOne(Document().append("name", "test1"))

        val result = collection.find(Document().append("name", "test"))
        assertEquals(1, result.count())
    }

    @Test
    fun testUnderscoresAreAllowedAsCollectionNames() {
        val collection = mongoClient.getDatabase("test")
                .getCollection("test_collection")

        collection.insertOne(Document().append("name", "testing_names"))
    }

    @Test
    fun testEverDocumentHasAn_id() {
        val collection = getRandomCollection()

        val result = collection.insertOne(Document().append("name", "testing_names"))

        assertTrue(result.wasAcknowledged())

        val idValue = result.insertedId
        assertNotNull(idValue)
        assertTrue(idValue!!.isObjectId)

        val idString = idValue.asObjectId().value.toHexString()
        assertFalse(idString.isBlank())
    }

    @Test
    fun testGettingIDAfterInsert() {
        val collection = getRandomCollection()
        collection.insertOne(Document().append("name", "testing_names"))

        val doc = collection.find().first()!!
        val id = doc.getObjectId("_id")

        assertNotNull(id)
        val idString = id.toHexString()
        assertFalse(idString.isBlank())
    }

    @Test
    fun testSorting() {
        val collection = getRandomCollection()

        val doc1 = Document().append("name", "first").append("timestamp", 1)
        val doc2 = Document().append("name", "second").append("timestamp", 2)
        val doc3 = Document().append("name", "third").append("timestamp", 3)

        collection.insertOne(doc3)
        collection.insertOne(doc2)
        collection.insertOne(doc1)

        val result = collection.find().sort(Document().append("timestamp", 1))

        val it = result.iterator()
        assertEquals(doc1, it.next())
        assertEquals(doc2, it.next())
        assertEquals(doc3, it.next())
    }
}
package dev.rfj.datasti.data.repository

import dev.rfj.datasti.data.api.Datapoint
import dev.rfj.datasti.error.InsertionFailedException

internal interface DataRepository {

    /**
     * Retrieve a <em>sorted</em> list of all [Datapoint]s in the given container for the given user
     */
    fun list(containerName: String, userId: String): List<Datapoint>

    /**
     * Insert the datapoint and return the newly created id as [String]
     *
     * @throws InsertionFailedException
     *  if the insertion operation has not been successful
     */
    @Throws(InsertionFailedException::class)
    fun save(datapoint: Datapoint, containerName: String, userId: String): String
}
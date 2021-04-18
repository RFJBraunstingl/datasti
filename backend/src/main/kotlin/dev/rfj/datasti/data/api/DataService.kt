package dev.rfj.datasti.data.api

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.error.*
import javax.xml.crypto.Data

/**
 * Interface to manage data points in datasti
 */
interface DataService {

    /**
     * Retrieve all data points in a given container sorted by timestamp
     *
     * required parameters in the passed container object are
     * - name
     * - userId
     * ...as the Service will verify the access using these parameters
     *
     * @throws UserUnknownException
     *  if the user was not found
     * @throws ContainerNotFoundException
     *  if no container with the given name was found for the user
     */
    fun getData(container: Container): List<Datapoint>

    /**
     * Add a new [Datapoint] to the given [Container]
     *
     * @throws UserUnknownException
     *  if the user was not found
     * @throws ContainerNotFoundException
     *  if no container with the given name was found for the user
     * @throws InsertionFailedException
     *  in case something went wrong in the backend
     */
    @Throws(InsertionFailedException::class)
    fun add(datapoint: Datapoint, container: Container): Datapoint
}

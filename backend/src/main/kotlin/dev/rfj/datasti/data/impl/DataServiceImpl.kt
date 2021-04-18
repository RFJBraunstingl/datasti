package dev.rfj.datasti.data.impl

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.data.api.DataService
import dev.rfj.datasti.data.api.Datapoint
import dev.rfj.datasti.data.repository.DataRepository
import dev.rfj.datasti.error.ContainerNotFoundException
import javax.enterprise.context.ApplicationScoped
import javax.xml.crypto.Data

@ApplicationScoped
internal class DataServiceImpl(
        private val dataRepository: DataRepository,
        private val containerService: ContainerService
) : DataService {

    override fun getData(container: Container): List<Datapoint> {

        val containersForUser = containerService.findByUserId(container.userId)
        if (!containersForUser.containOneWithName(container.name))
            throw ContainerNotFoundException() // is this really necessary?

        return dataRepository.list(
                containerName = container.name,
                userId = container.userId
        )
    }

    private fun Set<Container>.containOneWithName(name: String): Boolean {
        forEach { if (it.name == name) return true }
        return false
    }

    override fun add(datapoint: Datapoint, container: Container): Datapoint {

        val containersForUser = containerService.findByUserId(container.userId)
        if (!containersForUser.containOneWithName(container.name))
            throw ContainerNotFoundException() // is this really necessary?

        val id = dataRepository.save(
                datapoint,
                containerName = container.name,
                userId = container.userId
        )

        return datapoint.copy(
                id = id
        )
    }
}

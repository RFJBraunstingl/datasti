package dev.rfj.datasti.data.impl

import dev.rfj.datasti.container.api.Container
import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.data.api.DataService
import dev.rfj.datasti.data.repository.DataRepository
import dev.rfj.datasti.error.ContainerNotFoundException
import dev.rfj.datasti.error.UserUnknownException
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.`when`
import org.mockito.Mockito.mock
import util.randomDataPoints

const val USER = "user"
const val CONTAINER_NAME = "test"
val CONTAINER = Container().copy(
        userId = USER,
        name = CONTAINER_NAME
)

class DataServiceTests {

    private lateinit var dataRepository: DataRepository
    private lateinit var containerService: ContainerService

    private lateinit var service: DataService

    @BeforeEach
    fun setup() {
        dataRepository = mock(DataRepository::class.java)
        containerService = mock(ContainerService::class.java)
        `when`(containerService.findByUserId(USER))
                .thenReturn(setOf(CONTAINER))

        service = DataServiceImpl(
                dataRepository = dataRepository,
                containerService = containerService
        )
    }

    @Test
    fun testDataRetrieval() {
        val result = randomDataPoints()
        `when`(dataRepository.list(CONTAINER_NAME, USER))
                .thenReturn(result)

        assertEquals(result, service.getData(CONTAINER))
    }

    @Test
    fun testGetDataVerfiesUserExists() {
        `when`(containerService.findByUserId(USER))
                .thenThrow(UserUnknownException())

        assertThrows<UserUnknownException> {
            service.getData(CONTAINER)
        }
    }

    @Test
    fun testGetDataVerifiesContainerExists() {
        `when`(containerService.findByUserId(USER))
                .thenReturn(emptySet())

        assertThrows<ContainerNotFoundException> {
            service.getData(CONTAINER)
        }
    }
}

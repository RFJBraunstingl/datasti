package dev.rfj.datasti.container

import dev.rfj.datasti.container.api.ContainerService
import dev.rfj.datasti.container.impl.ContainerServiceImpl
import dev.rfj.datasti.container.repository.ContainerRepository
import dev.rfj.datasti.error.InsertionFailedException
import dev.rfj.datasti.error.NameConflictException
import dev.rfj.datasti.error.UserUnknownException
import dev.rfj.datasti.user.api.UserService
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import org.mockito.Mockito.*
import util.randomContainer
import util.randomContainerForUser

const val SOME_USER = "some-user"
const val UNKNOWN_USER = "no-user"

class ContainerServiceTests {

    private lateinit var containerRepository: ContainerRepository
    private lateinit var userService: UserService

    private lateinit var containerService: ContainerService

    @BeforeEach
    fun setup() {
        containerRepository = mock(ContainerRepository::class.java)
        userService = mock(UserService::class.java)

        `when`(userService.isUserRegistered(SOME_USER))
                .thenReturn(true)
        `when`(userService.isUserRegistered(UNKNOWN_USER))
                .thenReturn(false)

        containerService = ContainerServiceImpl(
                containerRepository,
                userService
        )
    }

    @Test
    fun testFindAllReturnsAllContainersForUserId() {
        val someContainers = setOf(
                randomContainer(),
                randomContainer(),
                randomContainer()
        )

        `when`(containerRepository.findByUserId(SOME_USER))
                .thenReturn(someContainers)

        Assertions.assertEquals(someContainers, containerService.findByUserId(SOME_USER))
    }

    @Test
    fun testFindFailsIfUserUnknown() {
        val userId = "tester"

        `when`(userService.isUserRegistered(userId))
                .thenReturn(false)

        assertThrows<UserUnknownException> {
            containerService.findByUserId(userId)
        }
    }

    @Test
    fun testContainerCreation() {
        val container = randomContainerForUser(SOME_USER)

        containerService.create(container)

        verify(containerRepository, times(1))
                .save(container, SOME_USER)
    }

    @Test
    fun testContainerCreationVerifiesUserExists() {
        assertThrows<UserUnknownException> {
            containerService.create(randomContainerForUser(UNKNOWN_USER))
        }
    }

    @Test
    fun testDuplicateContainersCanNotBeCreated() {
        val duplicateContainerName = "duplicate"
        val containerWithDuplicateName = randomContainerForUser(SOME_USER).copy(name = duplicateContainerName)

        `when`(containerRepository.findByUserId(SOME_USER))
                .thenReturn(setOf(containerWithDuplicateName))

        assertThrows<NameConflictException> {
            containerService.create(containerWithDuplicateName)
        }
    }

    @Test
    fun testInsertionFailurePropagates() {
        val container = randomContainer().copy(userId = SOME_USER)
        `when`(containerRepository.save(container, SOME_USER))
                .thenThrow(InsertionFailedException::class.java)

        assertThrows<InsertionFailedException> {
            containerService.create(container)
        }
    }
}

package dev.rfj.datasti.data.api

import io.quarkus.runtime.annotations.RegisterForReflection
import org.bson.Document

@RegisterForReflection
data class Datapoint(
        var id: String,
        var timestamp: Long,
        var value: String,
        var label: String
) {
    constructor(): this("", System.currentTimeMillis(), "", "")
}

fun Datapoint.toDocument(): Document {
    return Document()
            .append("timestamp", timestamp)
            .append("value", value)
            .append("label", label)
}

fun Document.toDatapoint(): Datapoint {
    return Datapoint(
            id = getObjectId("_id").toHexString(),
            timestamp = getLong("timestamp"),
            value = getString("value"),
            label = getString("label")
    )
}
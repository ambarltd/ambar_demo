
resource "ambar_data_source" "shipping_events" {
  data_source_type = "postgres"
  description      = "Shipping Events ${var.github_repository}"

  data_source_config = {
    "hostname" : local.postgres_source_host,
    "hostPort" : local.postgres_source_port,
    "databaseName" : local.postgres_source_database,
    "username" : local.postgres_source_username
    "password" : local.postgres_source_password
    "publicationName" : local.postgres_source_publication_name_shipping,
    "tableName" : "event_shipping",
    "columns" : "serial_column,partition_key,event_payload,event_type,occurred_at"
    "partitioningColumn" : "partition_key"
    "serialColumn" : "serial_column"
  }
}

resource "ambar_filter" "all_shipping_events" {
  data_source_id  = ambar_data_source.shipping_events.resource_id
  description      = "All Shipping Events ${var.github_repository}"
  filter_contents = "true"
}

resource "ambar_filter" "shipping_returns" {
  data_source_id  = ambar_data_source.shipping_events.resource_id
  description      = "Shipping Returns ${var.github_repository}"
  filter_contents = "lookup(\"event_type\") == \"shipment_returned\""
}

resource "ambar_data_destination" "shipping_all_events" {
  filter_ids = [
    ambar_filter.all_shipping_events.resource_id,
  ]
  description          = "Shipping - All Events ${var.github_repository}"
  destination_endpoint = "https://${local.destination_domain}/shipping/destination/all_events"
  username             = local.destination_username
  password             = local.destination_password
}

resource "ambar_data_destination" "shipping_return_review" {
  filter_ids = [
    ambar_filter.shipping_returns.resource_id,
  ]
  description          = "Shipping - Review Return ${var.github_repository}"
  destination_endpoint = "https://${local.destination_domain}/shipping/destination/returns_review"
  username             = local.destination_username
  password             = local.destination_password
}

/*
resource "ambar_filter" "credit_card_transactions" {
  data_source_id  = ambar_data_source.credit_card_events.resource_id
  description      = "Credit Card Transactions"
  filter_contents = "lookup(\"event_type\") == \"transaction\""
}

resource "ambar_data_destination" "credit_card_fraud_review" {
  filter_ids = [
    ambar_filter.credit_card_transactions.resource_id,
  ]
  description          = "Credit Card - Review For Fraud"
  destination_endpoint = "https://${local.destination_domain}/credit_card/destination/fraud_review"
  username             = local.destination_username
  password             = local.destination_password
}
*/


resource "ambar_data_source" "credit_card_events" {
  data_source_type = "postgres"
  description      = "Credit Card Events"

  data_source_config = {
    "hostname" : local.postgres_source_host,
    "hostPort" : local.postgres_source_port,
    "databaseName" : local.postgres_source_database,
    "username" : local.postgres_source_username
    "password" : local.postgres_source_password
    "publicationName" : local.postgres_source_publication_name_credit_card,
    "tableName" : "event_credit_card",
    "columns" : "serial_column,partition_key,event_payload,event_type,occurred_at"
    "partitioningColumn" : "partition_key"
    "serialColumn" : "serial_column"
  }
}

resource "ambar_filter" "all_credit_card_events" {
  data_source_id  = ambar_data_source.credit_card_events.resource_id
  description      = "All Credit Card Events"
  filter_contents = "true"
}

resource "ambar_data_destination" "credit_card_all_events" {
  filter_ids = [
    ambar_filter.all_credit_card_events.resource_id,
  ]
  description          = "Credit Card - All Events"
  destination_endpoint = "https://${local.destination_domain}/credit_card/destination/all_events"
  username             = local.destination_username
  password             = local.destination_password
}

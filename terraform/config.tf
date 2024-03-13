terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "5.33.0"
    }
    ambar = {
      source  = "ambarltd/ambar"
      version = "1.0.6"
    }
  }

  backend "s3" {
    encrypt        = true
    key            = "application.tfstate"
  }
}

provider "ambar" {
  endpoint = local.secret.ambar.api_endpoint
  api_key  = local.secret.ambar.api_key
}

variable secret_in_base_64 {
  type = string
}

variable github_repository {
  type = string
}

locals {
  secret = jsondecode(base64decode(var.secret_in_base_64))
}

locals {
    destination_domain  = local.secret.domains.backend_domain_name
    destination_username = local.secret.destination_config.username
    destination_password = local.secret.destination_config.password
    postgres_source_host = local.secret.postgres_source.host
    postgres_source_port = tostring(local.secret.postgres_source.port)
    postgres_source_database = local.secret.postgres_source.database
    postgres_source_username = local.secret.postgres_source.username
    postgres_source_password = local.secret.postgres_source.password
    postgres_source_publication_name_credit_card = local.secret.postgres_source.publication_names.credit_card
    postgres_source_publication_name_shipping = local.secret.postgres_source.publication_names.shipping
}
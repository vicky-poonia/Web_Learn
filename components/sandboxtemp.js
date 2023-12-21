export const Azure_data = {
  data: [
    {
      category_title: "Compute",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        {
          service_name: "Virtual machine",
          service_description:
            "1.standard_b1ls <br>\n 2.standard_b1ms <br>\n 3.standard_b1s <br>\n 4.standard_b2s ",
        },
        { service_name: "App service", service_description: "" },
        { service_name: "Container instance", service_description: "" },
        { service_name: "Function App", service_description: "" },
        { service_name: "Kubernetes services", service_description: "" },
        { service_name: "Availability set", service_description: "" },
        { service_name: "Disks", service_description: "" },
        { service_name: "Container registries", service_description: "" },
      ],
    },
    {
      category_title: "Networking",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        { service_name: "Virtual Network", service_description: "" },
        { service_name: "Load balancer", service_description: "" },
        { service_name: "Network Security Group", service_description: "" },
        { service_name: "NAT Gateway", service_description: "" },
      ],
    },
    {
      category_title: "Database",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        { service_name: "Cosmos DB", service_description: '1.No of RUs: "20 RUs"' },
        { service_name: "Azure SQL", service_description: "" },
        { service_name: "Azure Database for MySQL Server", service_description: "" },
        { service_name: "Azure Database for PostgreSQL Server", service_description: "" },
        { service_name: "Azure Cosmos DB API for MongoDB", service_description: "" },
      ],
    },
    {
      category_title: "Storage",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        {
          service_name: "Storage account",
          service_description:
            '1.Allowed SKUs: "standard_grs","standard_gzrs",<br>"standard_lrs","standard_ragrs","standard_ragzrs"',
        },
        { service_name: "Blob", service_description: "" },
        { service_name: "Queue", service_description: "" },
        { service_name: "Table", service_description: "" },
        { service_name: "Storage explorer", service_description: "" },
        { service_name: "File Share", service_description: "" },
      ],
    },
    {
      category_title: "Web",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        { service_name: "Azure App Service Plan", service_description: "" },
        { service_name: "App Services", service_description: "" },
      ],
    },
    {
      category_title: "Monitor",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        { service_name: "Application Insights", service_description: "" },
        { service_name: "Monitor", service_description: "" },
        { service_name: "Alerts", service_description: "" },
        { service_name: "Metrics", service_description: "" },
      ],
    },
    {
      category_title: "Internet of Things",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [
        { service_name: "IoT Hub", service_description: "" },
        { service_name: "IoT Central Applications", service_description: "" },
      ],
    },
    {
      category_title: "Security",
      max_lifetime: "5",
      sandbox_slug: "azure-sandbox",
      sandbox_title: "Whizlabs Azure Sandbox",
      services: [{ service_name: "Key Vault", service_description: "" }],
    },
  ],
};

export const gcp_data = {
  data: [
    {
      category_title: "Compute",
      max_lifetime: "3",
      sandbox_slug: "gcp-sandbox",
      sandbox_title: "Whizlabs GCP Sandbox",
      services: [
        {
          service_name: "VM Instance",
          service_description:
            "Machine-Type: n1-standard-1 <br>\n Region: US  <br>\n Max Machines: 3",
        },
        {
          service_name: "Google Kubernetes Engine",
          service_description: "Machine-Type: n1-standard-1 <br>\n Region: US  <br>\n Max Nodes: 3",
        },
      ],
    },
    {
      category_title: "Serverless",
      max_lifetime: "3",
      sandbox_slug: "gcp-sandbox",
      sandbox_title: "Whizlabs GCP Sandbox",
      services: [
        { service_name: "Cloud Function", service_description: "Max Build Time: 100ms" },
        { service_name: "Cloud Run", service_description: "Max Services: 1" },
        { service_name: "App Engine", service_description: "Not Allowed" },
      ],
    },
    {
      category_title: "Databases",
      max_lifetime: "3",
      sandbox_slug: "gcp-sandbox",
      sandbox_title: "Whizlabs GCP Sandbox",
      services: [
        {
          service_name: "Cloud SQL",
          service_description: "Max RAM: 3.75 GB/CPU <br>\n Max vCPU: 3",
        },
        {
          service_name: "BigTable",
          service_description: "Max Nodes: 1 <br>\n Machine Type: n1-standard-1",
        },
        { service_name: "Cloud Spanner", service_description: "Max Nodes: 1 <br>\n Max vCPU: 3" },
      ],
    },
    {
      category_title: "Analytics",
      max_lifetime: "3",
      sandbox_slug: "gcp-sandbox",
      sandbox_title: "Whizlabs GCP Sandbox",
      services: [
        { service_name: "BigQuery", service_description: "Max Query Size: 1 GB" },
        {
          service_name: "Dataflow",
          service_description: "Max Jobs: 3 <br>\n Machine Type: n1-standard-1",
        },
      ],
    },
  ],
};

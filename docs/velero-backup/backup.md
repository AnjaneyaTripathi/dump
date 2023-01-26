# Velero Backup on GCP

### Authorization and Login

Authorize and login yourself. 

```gcloud auth login``` 

### Setup

Creating the bucket.

```
BUCKET=convint-bucket-alpha
gsutil mb gs://$BUCKET/
```

Creating service account for Velero.

```
gcloud iam service-accounts create velero \
    --display-name "Velero service account"

SERVICE_ACCOUNT_EMAIL=$(gcloud iam service-accounts list \
    --filter="displayName:Velero service account" \
    --format 'value(email)')

ROLE_PERMISSIONS=(
    compute.disks.get
    compute.disks.create
    compute.disks.createSnapshot
    compute.snapshots.get
    compute.snapshots.create
    compute.snapshots.useReadOnly
    compute.snapshots.delete
    compute.zones.get
)

gcloud iam roles create velero.server \
    --project $PROJECT_ID \
    --title "Velero Server" \
    --permissions "$(IFS=","; echo "${ROLE_PERMISSIONS[*]}")"

gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member serviceAccount:$SERVICE_ACCOUNT_EMAIL \
    --role projects/$PROJECT_ID/roles/velero.server

gsutil iam ch serviceAccount:$SERVICE_ACCOUNT_EMAIL:objectAdmin gs://${BUCKET}

gcloud iam service-accounts keys create credentials-velero \
    --iam-account $SERVICE_ACCOUNT_EMAIL
```

### Installing Velero 

```
velero install \
    --provider gcp \
    --plugins velero/velero-plugin-for-gcp:v1.1.0 \
    --bucket $BUCKET \
    --secret-file ./credentials-velero
```

### Backing Up

Scheduling the backups.

```
BACKUP=daily-default

SCHEDULE=daily

velero schedule create $SCHEDULE --schedule="0 0 * * *" --include-namespaces default

velero backup create $BACKUP --from-schedule $SCHEDULE
```

View all the backups.

```
velero backup get
```

### Restoring

Check for the available backups.

```
velero backup get
```

```
velero restore create --include-namespaces default --from-backup $BACKUP
```








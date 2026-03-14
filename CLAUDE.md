# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Docker Compose deployment for a complete PACS (Picture Archiving and Communication System) stack combining DCM4CHEE (DICOM image archiving server) with the OHIF Viewer (web-based medical image viewer).

## Common Commands

```bash
# Start all services in the background
docker-compose up -d

# Stop all services
docker-compose down

# View logs for a specific service
docker-compose logs -f arc
docker-compose logs -f ohif

# Restart a single service
docker-compose restart ohif
```

## Architecture

Four services with a strict dependency chain: `ldap` and `db` → `arc` → `ohif`

| Service | Image | Purpose | Key Ports |
|---------|-------|---------|-----------|
| `ldap` | `dcm4che/slapd-dcm4chee:2.6.5-31.2` | OpenLDAP for DCM4CHEE user management | 389 |
| `db` | `dcm4che/postgres-dcm4chee:15.4-31` | PostgreSQL for DICOM metadata | internal |
| `arc` | `dcm4che/dcm4chee-arc-psql:5.31.2` | Main PACS/DICOMweb server (WildFly) | 8080, 8443, 11112, 104 |
| `ohif` | `ohif/app` | Web DICOM viewer (nginx) | 3010→80 |

**Storage volumes** (host paths, must exist before starting):
- `/var/local/dcm4chee-arc/ldap/` and `/var/local/dcm4chee-arc/slapd.d/` — LDAP data
- `/var/local/dcm4chee-arc/db/` — PostgreSQL data
- `/var/local/dcm4chee-arc/wildfly/` — WildFly config/logs
- `/var/local/dcm4chee-arc/storage/` — DICOM image files

## OHIF Configuration (`ohif/app-config.js`)

The only file that typically needs editing per environment. It configures the DICOMweb endpoints pointing to the `arc` service:

- **Production/remote**: currently points to IP `154.38.162.74`
- **Local development**: replace `154.38.162.74` with `localhost`

The OHIF viewer is served at `http://localhost:3010` with `routerBasename: 'med-iq-viewer'`.

## Service Access

- **OHIF Viewer**: `http://localhost:3010`
- **DCM4CHEE UI**: `http://localhost:8080/dcm4chee-arc/ui2` (admin / admin)
- **PostgreSQL**: host `db`, database `pacsdb`, user/password `pacs`/`pacs`

## Key Behavior Notes

- `arc` waits for `ldap:389` and `db:5432` to be ready before starting (`WILDFLY_WAIT_FOR`)
- All services use `json-file` logging with 10MB max size
- Timezone is inherited from the host via bind-mounted `/etc/localtime` and `/etc/timezone`
- The `ohif` container runs nginx internally; the custom `app-config.js` is bind-mounted into `/usr/share/nginx/html/`

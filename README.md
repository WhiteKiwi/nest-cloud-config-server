# nestjs-server-template

## 사용방법
1. /configs/{config-group}.yml 파일 생성
2. cloud-config.whitekiwi.link/api/v1/{config-group} 에서 컨피그 조회
	- dev: cloud-config.dev.whitekiwi.link/api/v1/{config-group}
	- sample: https://cloud-config.dev.whitekiwi.link/api/v1/sample

### 암복호화
1. POST /api/v1/encrypt { value: "..." }
1. POST /api/v1/decrypt { value: "..." }

# nestjs-server-template

## 사용방법
1. /configs/{config-group}.yml 파일 생성
2. cloud-config.whitekiwi.link/{config-group} 에서 컨피그 조회
	- dev: cloud-config.dev.whitekiwi.link/{config-group}
	- sample: https://cloud-config.dev.whitekiwi.link/sample

### 암복호화
1. POST /encrypt { value: "..." }
1. POST /decrypt { value: "..." }

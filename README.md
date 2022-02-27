# nestjs-server-template

## 사용방법
1. /configs/{config-group}.yml 파일 생성
2. cloud-config.whitekiwi-test.com/{config-group} 에서 컨피그 조회
	- dev: cloud-config.dev.whitekiwi-test.com/{config-group}
	- sample: https://cloud-config.dev.whitekiwi-test.com/sample

### 암복호화
1. POST /encrypt { value: "..." }
1. POST /decrypt { value: "..." }

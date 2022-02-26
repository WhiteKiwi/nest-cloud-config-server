# 수동으로 배포할 때 사용
if [ "$1" == "--help" ] || [ "$1" == "-h" ]; then
	# TODO: Usage 추가
	echo "Usage: "
	exit 0
fi

docker login --username AWS -p $(aws ecr get-login-password --region ap-northeast-2) 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com
if [ $1 ]; then
	# 태그있으면 붙임
	# Upload image to ECR
	docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server:$1 .
	docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server:$1

	# Restart services
	aws ecs update-service --force-new-deployment --service api --cluster cloud-config-server
else
	# 태그없으면 latest
	# Upload image to ECR
	docker build --no-cache -t 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server:latest .
	docker push 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server:latest

	# Restart services
	aws ecs update-service --force-new-deployment --service api-dev --cluster cloud-config-server
fi

if [ "$2" == "--clear" ] || [ "$2" == "-c" ]; then
	docker images | grep 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server | tr -s ' ' | cut -d ' ' -f 2 | xargs -I {} docker rmi 138497848618.dkr.ecr.ap-northeast-2.amazonaws.com/cloud-config-server:{}
fi


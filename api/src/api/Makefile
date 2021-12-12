TAG="1.00"
NAMESPACE="startdusk-dotnet"
APP_NAME="ctripapi"

build-image:
	@echo "build image start"
	@docker build -t $(NAMESPACE)/$(APP_NAME) .
	@echo "build image end"

push-image: build-image
	@echo "push image start"
	@docker tag  $(NAMESPACE)/$(APP_NAME) ccr.ccs.tencentyun.com/$(NAMESPACE)/$(APP_NAME):$(TAG)
	@docker push ccr.ccs.tencentyun.com/$(NAMESPACE)/$(APP_NAME):$(TAG)
	@echo "push image end"
# 不知道为啥推送不上去。。
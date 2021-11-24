# ref: https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/docker/building-net-docker-images?view=aspnetcore-5.0
FROM mcr.microsoft.com/dotnet/sdk:5.0 AS build-dev

WORKDIR /app

# 拷贝依赖文件到app目录
COPY *.csproj ./
# 下载依赖文件
RUN dotnet restore

# 拷贝整个源码到app目录下
COPY . ./

# 编译文件 输出到 out 目录
RUN dotnet publish -c Release -o out

# 启动这个容器会自动把端口映射到80
FROM mcr.microsoft.com/dotnet/aspnet:5.0
WORKDIR /app
COPY --from=build-dev /app/out . 
ENTRYPOINT [ "dotnet", "api.dll" ]
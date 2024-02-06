---
title: RPC 通信原理
date: 2024-02-06
icon: RPC
category:
  - RPC
---

> 本章节内容基本是概念原理学习，不过多涉及代码。
> 后续的[《手写 RPC 通信 TODO》](https://www.baidu.com)会在代码层面更深层次的学习。

## 什么是 RPC：
RPC 全称：Remote Procedure Call，**远程调用过程**。它定义了一台计算机上的程序去调用另一台计算机上**子程序**的这一行为。
在项目中服务间的调用，比如：用户服务调用订单服务获取该用户下的订单数据（跨进程跨网络的远程调用）就利用到了 RPC。
RPC 特点：

- 把远程调用搬到了本地，效果上远程调用和本地调用没有差别。
- 使用 CS 模式，客户端发起请求并传递参数，服务端接收请求参数后执行，并将执行结果返回。
- 底层网络通信细节对上层开发者屏蔽，上层开发者无需为网络通信交互过程做额外编码，做到应用无侵入。

RPC 作用：

- 使用起来远程调用和本地调用无差异，屏蔽了两者的区别。
- 开发者更加专注于业务逻辑，不用考虑跨进程跨网络调用的底层原理。

市面上常见的 RPC 框架：
- [dubbo](https://cn.dubbo.apache.org/)
- [Spring Cloud OpenFeign](https://spring.io/projects/spring-cloud-openfeign/)
- grpc：Google 自研
- Motan：微博自研
- Tars：腾讯自研
- Thrift：Facebook 自研

RPC 调用的具体流程：

1. 客户端调用接口通过**动态代理**生成代理类，组装请求并且将数据进行**序列化**，然后经过**协议编码**通过网络模块发送。
2. 服务端收到请求，进行**协议解析**以及**反序列化**得到请求参数。
3. 服务端根据请求参数调用接口实现，然后组装响应数据。
4. 响应按同样的方式返回。

RPC 中涉及的关键技术点：

1. 动态代理
2. 序列化技术
3. 通信协议

RPC 高级特性：

1. 服务注册与发现：比如订单接口所在的服务是集群，是动态伸缩的。RPC 需要对服务进行订阅，可以做到读取接口服务列表、监听接口提供者变更。提供接口服务变更通知的能力。常见注册中心：zookeeper、nacos、consul、etcd、eureka......
2. 因为涉及到了集群，那么 RPC 就可以在实现远程调用的基础上还可以提供：集群容错策略、服务路由策略、负载均衡策略、熔断限流管理。

简单的介绍了 RPC，那为什么要用 RPC 呢？
使用 RPC 的优势：

- 让构建分布式应用更容易，解耦服务，容易扩展。
- RPC 框架一般使用的是长链接，不必每次通信都建立连接，减少网络的开销。
- RPC 框架需要有注册中心，可以动态感知服务变化并注册中心可提供可视化页面。
- 丰富的后台管理功能，可统一管理接口服务，对调用方来说是无感知、统一化的操作。
- RPC 能做到协议精简，效率更高，私密安全性高。
- RPC 的服务治理功能可以让我们很方便的调控流量，参数等。
- RPC 是面向服务的更高级的抽象，支持服务注册发现，负载均衡，容错，流量管理等高级特性。

浅谈 RPC 中的**注册中心**，以 zookeeper 为例
注册中心需要满足存储数据、变更通知这两点要求。zookeeper 本身是一个**树形目录服务**，非常**类似于标准文件系统**。

- 路径名+节点名构成唯一表示标识 key。
- 节点中也可以存储数据 value。
- watch 机制可监听节点的变更。

zookeeper 中节点的类型：

| 类型 | 描述 |
| --- | --- |
| PERSISTENT | 持久节点，默认 |
| PERSISTENT_SEQUENTIAL | 持久顺序节点，创建时 zookeeper 会加上序号作为后缀，非常适用于分布式锁、分布式选举等场景，创建时添加 -s 参数 |
| EPHEMERAL | 临时节点，跟创建节点的连接会话绑定，临时节点会在客户端会话断开后由 zookeeper 服务端自动删除。适用于心跳、服务发现等场景，创建时添加 -e 参数 |
| EPHEMERAL_SEQUENTIAL | 临时顺序节点（不可再拥有子节点），与持久顺序节点类似，不同之处在于 EPHEMERAL_SEQUENTIAL 是临时的，会在会话断开后删除，创建时添加 -e -s 参数 |
| CONTAINER | 容器节点，当子节点都被删除后，CONTAINER 也会删除，创建时添加 -c 参数 |
| PERSISTENT_WITH_TTL | TTL 节点，客户端断开连接后不会自动删除该节点，如果该节点没有子节点且在给定 TTL 时间内无修改，该节点将会被删除，单位是毫秒，创建时添加 -t 参数 |

基于 zookeeper 的注册数据存储模型，以 dubbo 为例
dubbo 在 zookeeper 中注册的数据模型：/dubbo/接口/providers/**

RPC **动态代理**的选型和 JDK 动态代理原理
动态代理在 RPC 中的作用：

- RPC 框架会自动给接口生成一个代理类。当我们在项目中依赖注入接口的时候，运行过程中实际绑定的是这个接口生成的代理类。
- 在接口方法被调用的时候，它实际上是被生成代理类拦截到了，这样我们就可以在生成的代理类里面加入远程调用逻辑。

JDK 动态代理原理：
示例代码
```java
public static void main(String[] args) {
    System.out.println("======1======");
    System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles","true");
    UserService proxy = (UserService) Proxy.newProxyInstance(
            Thread.currentThread().getContextClassLoader(),
            new Class[]{UserService.class},
            new InvocationHandler() {
                @Override
                public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                    System.out.println("======3======");
                    System.out.println("发起远程网络调用");
                    //模拟返回结果
                    return User.builder().id((String) args[0]).name("tengbin").age("27").build();
                }
            }
    );
    System.out.println("======2======");
    //代理对象的方法调用
    User user = proxy.findUser("0");
    System.out.println("======4======");
    System.out.println(user);
}
```
观察生成代理类可知晓。
```java
//生成的 class 保存在工程根目录下的 com/sun/proxy 目录里面
System.setProperty("sun.misc.ProxyGenerator.saveGeneratedFiles","true");
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12708524/1707202597039-6e14d870-d949-48c2-a9c4-cc68e3e13876.png#averageHue=%23202224&clientId=u81f33cca-23c9-4&from=paste&height=101&id=uf03676d5&originHeight=202&originWidth=582&originalType=binary&ratio=2&rotation=0&showTitle=false&size=34213&status=done&style=none&taskId=u8d188d4f-81a7-4050-878e-c204aefc464&title=&width=291)
![image.png](https://cdn.nlark.com/yuque/0/2024/png/12708524/1707202618573-fc7fcd80-d306-440e-b1a4-1a898a33a010.png#averageHue=%23202124&clientId=u81f33cca-23c9-4&from=paste&height=134&id=uc941554c&originHeight=267&originWidth=1148&originalType=binary&ratio=2&rotation=0&showTitle=false&size=82696&status=done&style=none&taskId=u36e2ffe1-feb8-48d8-8d9d-170b3468cb7&title=&width=574)

1. Thread.currentThread().getContextClassLoader(),
2. new Class[]{UserService.class}, 接口class
3. 重写 InvocationHandler 接口的 invoke 方法，该方法中进行远程网络调用
4. 执行 proxy.findUser("0"); 时实际是调用 invoke 方法。可观察输出日志

![image.png](https://cdn.nlark.com/yuque/0/2024/png/12708524/1707202781400-3556311b-1d99-4ec0-bea3-ebaa71aa9ebe.png#averageHue=%2328292b&clientId=u81f33cca-23c9-4&from=paste&height=124&id=u5d9332b3&originHeight=160&originWidth=270&originalType=binary&ratio=2&rotation=0&showTitle=false&size=13774&status=done&style=none&taskId=u1ef58657-ca65-45be-b2fe-8fb51fdc869&title=&width=209)

其他动态代理解决方案

- [ASM](https://asm.ow2.io/)：可直接对字节码文件进行修改，也可生成字节码，开发者要掌握字节码结构以及更为底层的指令。
- [cglib](https://github.com/cglib/cglib)：基于ASM，Spring AOP 也可以使用它，其原理是动态生成一个要代理类的子类。
- [bytebuddy](https://bytebuddy.net/#/)：也是基于 ASM API 实现的，是一个较高层级的抽象的字节码操作工具，通过使用Byte Buddy，任何熟悉 Java 编程语言的人都有望非常容易地进行字节码操作。
- [Javassist](https://github.com/jboss-javassist/javassist)：增强字节码时直接使用 Java 编码的形式，而不需要了解虚拟机指令，就能动态改变类的结构或者动态生成类。

RPC 如何选择**序列化**框架
序列化本质：任何一种序列化框架，核心思想就是设计一种**序列化协议**，将对象的类型、属性类型、属性值一一按照固定的格式写到二进制字节流中来完成序列化，再按照固定的格式一一读出对象的类型、属性类型、属性值，通过这些信息重新创建出一个新的对象，来完成反序列化。
常见序列化框架：

- JDK 原生序列化
   - 基于ObjectOutputStream 和 ObjectInputStream
   - Java 语言本身提供，使用比较方便和简单
   - 不支持跨语言处理，性能相对不是很好，序列化以后产生的数据相对较大
- JSON/XML
   - 可读性好，方便阅读和调试，多语言支持，序列化以后的字节文件相对较大，效率相对不高，但对比 XML 序列化后的字节流更小，在企业运用普遍，特别是对前端和三方提供 api
- Hessian
   - Hessian 是一个动态类型，二进制，并且支持跨语言特性的序列化框架
   - Hessian 性能上要比 JDK、JSON 序列化高效很多，并且生成的字节数也更小。有非常好的兼容性和稳定性，所以 Hessian 更加适合作为 RPC 框架远程通信的序列化协议
- Protobuf
   - Google 推出的开源序列库，它是一种轻便、高效的结构化数据存储格式，多语言支持。
   - 速度快，压缩比高，体积小，序列化后体积相比 JSON、Hessian 小很多
   - 消息格式的扩展、升级和兼容性都不错，可以做到向后兼容

序列化选型依据


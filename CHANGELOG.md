## 更新日志

***

### 2021-03-09
开始做project-api部分，DB的数据迁移真是个麻烦事呢。

***

### 2021-03-07
#### 用`sequelize`替换`sequelize-ts`
- 发现`sequelize-ts`里面的`sequelize`版本太久了，竟然是4.x.x。  
  于是狠心换成`egg-sequelize`，但这个egg-plugin竟然完全没做ts版的提示。  
  还好ets配置我懂。自己写一下就是。ets简直神器，向作者们致敬！

- `model`里面的代码要完全重写，从ts版的decorator换回去传统code。  
  麻烦的地方主要是关联部分的描述。还好本来sequelize的迁移就不用decorator。

#### sequelize迁移改用ts写

没有类型提示，学习成本会很高。还是弄成ts吧。  
要配置一个专用`tsconfig.database.json`去渲染成js。

#### 整理了`test`里面与`factory-girl`相关的调用
`factory-girl`确实是个很不错的工具


***

### 2021-03-03
准备找工作，备份一下
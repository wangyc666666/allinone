-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: xfx_server
-- ------------------------------------------------------
-- Server version	5.7.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `BuyCart`
--

DROP TABLE IF EXISTS `BuyCart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BuyCart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_owner_id` int(11) DEFAULT NULL,
  `date_added` datetime(6) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_owner_id` (`cart_owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BuyCart`
--

LOCK TABLES `BuyCart` WRITE;
/*!40000 ALTER TABLE `BuyCart` DISABLE KEYS */;
/*!40000 ALTER TABLE `BuyCart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BuyCart_product`
--

DROP TABLE IF EXISTS `BuyCart_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BuyCart_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buycart_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `buycart_id` (`buycart_id`,`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BuyCart_product`
--

LOCK TABLES `BuyCart_product` WRITE;
/*!40000 ALTER TABLE `BuyCart_product` DISABLE KEYS */;
/*!40000 ALTER TABLE `BuyCart_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_admin`
--

DROP TABLE IF EXISTS `app01_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username_id` int(11) DEFAULT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_type_id` int(11) DEFAULT NULL,
  `user_valid` tinyint(1) NOT NULL,
  `userpic` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `gender` varchar(1) COLLATE utf8_unicode_ci NOT NULL,
  `signature` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `focus_count` int(11) NOT NULL,
  `create_date` datetime(6) DEFAULT NULL,
  `my_cart_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_id` (`username_id`),
  UNIQUE KEY `my_cart_id` (`my_cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_admin`
--

LOCK TABLES `app01_admin` WRITE;
/*!40000 ALTER TABLE `app01_admin` DISABLE KEYS */;
INSERT INTO `app01_admin` VALUES (1,1,'674702627@qq.com',1,1,'images/1.jpg','M','先天下之忧 后天下之乐',0,'2019-08-15 12:53:45.567960',NULL);
/*!40000 ALTER TABLE `app01_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_admin_focususer`
--

DROP TABLE IF EXISTS `app01_admin_focususer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_admin_focususer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `from_admin_id` int(11) NOT NULL,
  `to_admin_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `from_admin_id` (`from_admin_id`,`to_admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_admin_focususer`
--

LOCK TABLES `app01_admin_focususer` WRITE;
/*!40000 ALTER TABLE `app01_admin_focususer` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_admin_focususer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_advertising`
--

DROP TABLE IF EXISTS `app01_advertising`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_advertising` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8_unicode_ci,
  `newlink` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `newpic` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_advertising`
--

LOCK TABLES `app01_advertising` WRITE;
/*!40000 ALTER TABLE `app01_advertising` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_advertising` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_carousel`
--

DROP TABLE IF EXISTS `app01_carousel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_carousel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8_unicode_ci,
  `newlink` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `newpic` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `create_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_carousel`
--

LOCK TABLES `app01_carousel` WRITE;
/*!40000 ALTER TABLE `app01_carousel` DISABLE KEYS */;
INSERT INTO `app01_carousel` VALUES (1,'真正努力的人，其实都很低调','前几天去参加同学的婚礼，突然发现，半年不见的新娘芳芳居然变成了一个瘦美人。','<p>前几天去参加同学的婚礼，突然发现，半年不见的新娘芳芳居然变成了一个瘦美人。</p>\r\n\r\n<p><img alt=\"瘦美人\" src=\"https://m.43626.cn/zb_users/upload/2019/08/201908151565835635219389.jpg\" title=\"瘦美人\" /></p>\r\n\r\n<p>要知道，她曾经体重严重超标，每次都发誓减肥，可是每次无论她的声势多么浩大，依旧坚持不了几天。所以后来，只要我们从她嘴里听到&ldquo;减肥&rdquo;两个字，就知道又没戏了。</p>\r\n\r\n<p>可是从今年夏天开始，她就神不知鬼不觉地开始默默减肥了，每天早起跑步，三餐定量，睡前1小时做运动。在这期间，她从没有向任何人提起自己的减肥经历，也没有晒过练出的小蛮腰，更没有吐露一丝一毫的不容易。她咬牙坚持了大半年，如今终于瘦下来，这让许多同学刮目相看。</p>\r\n\r\n<p>我问她，为什么这一次突然就这么低调了？芳芳说，因为这一次，我坚信自己真的能瘦下来啊。</p>\r\n\r\n<p>当时我还在想，这是什么逻辑，让别人知道你的减肥计划，不是更能证明自己的信心很足吗？</p>\r\n\r\n<p>芳芳说，以前我喜欢秀努力、秀决心、秀美好的小计划，因为我需要靠宣扬得到别人的肯定，当然也是为了给自己壮胆。但是到后来，我发现，当我真正发自内心想要做成某件事，就不会太在乎要不要晒给别人看，我自己的内在驱动力足够支撑我，无论遇到任何困难和挫折，都能坚持到底。</p>\r\n\r\n<p>真正努力的人，都很低调，因为他们的努力，不是靠外界给予勇气和信心，而是能自己给自己打气加油。</p>\r\n\r\n<p>不知道你有没有发现，越是爱秀努力的人，他们最后得到的成绩往往越不尽如人意。</p>\r\n\r\n<p>我认识一个看起来很勤奋敬业、励志上进的青年小郭。他总是喜欢在周末早晨晒出差照，在下班后晒加班图，在凌晨两点发读书感言。</p>\r\n\r\n<p>刚开始，我觉得他真有那么努力，后来才听一个熟人提起，他呀，其实就是一个眼高手低又特别喜欢炫的人。</p>\r\n\r\n<p>比如，他的工作做得一塌糊涂，平时偷奸耍滑，迟到早退就有他，可是只要偶尔有加班，就要抓住机会，制造出我很忙的假象。</p>\r\n\r\n<p>比如，他在生活中，每天晚睡晚起，平时除了爱打游戏，就是吃喝玩乐，每当自己偶尔觉悟要改变生活方式时，就喜欢拍照装装样子，让别人误以为他其实很不错。</p>\r\n\r\n<p>我常在想，他如果能把努力修图、发照、回评论的时间，用来多做几页ppt、多看几页书、多背几个单词，收获可能会更大，而不是每天浪费这么多时间，沉浸在别人的点赞和好评中。</p>\r\n\r\n<p>真正努力的人，都很低调，因为他们真的没时间感动自己。</p>\r\n\r\n<p>我曾经也是一个爱秀努力的人。每当到图书馆、书店，或者任何有书的地方，我总是喜欢装模作样，拍些专门为发朋友圈的读书照；或者偶尔写一首小诗、一篇书评，就迫不及待把它转到朋友圈，让大家都知道我有个多么棒的写作爱好。</p>\r\n\r\n<p>现在的我，已经很少晒读书照了，因为读书已经成为了我每天都必须要做的事。每天读书一小时，每周读完两本书，每个月去一次图书馆，自然就不觉得读书这件事有什么值得炫耀的了。至于写作，这两年来，写下近160万字的文章后，我反而不爱秀了，只是偶尔把写得相对较好的几篇分享给大家看看。</p>\r\n\r\n<p>曾经的我，把爱读书写作当成一件值得被别人称赞的事，可是后来当它成为了一种习惯，一种就跟人每天都需要吃饭睡觉一样简单的日常事务后，我反而觉得它就是一个稀疏平常的爱好。</p>\r\n\r\n<p>真正努力的人，都很低调，因为他们把努力当成了一种习惯，而不是选择。</p>\r\n\r\n<p>其实，努力是一件特别需要沉下心来，长久坚持去做的事。而且，它成长的土壤特别需要一个人的单打独斗，需要忍受无数个孤独和寂寞的日子。</p>\r\n\r\n<p>当你正在努力时，不妨低调一点。</p>\r\n\r\n<p>首先，当你决定去努力时，要明白，说过不等于做过，要把语言上的豪情转化为行动上的积累。</p>\r\n\r\n<p>其次，努力是一个漫长的过程，它应当成为你的常态，而不是包装自己的标签。如果你能把秀努力的时间拿来做真正有意义的事，那么你一定会成长得更快。</p>\r\n\r\n<p>第三，努力是我们一生都应该坚持的事，日复一日，而不是临时抱佛脚。只有当你把努力当作一种习惯，你才能真正领悟到&ldquo;活到老，学到老&rdquo;的真谛。</p>\r\n\r\n<p>我特别喜欢大作家歌德的一句话：我这一生基本上只是辛苦工作，我可以说，我活了七十五岁，没有哪一个月过的是舒服生活，就好像推一块石头上山，石头不停地滚下来又推上去。</p>\r\n\r\n<p>真正努力的人，其实都很低调。</p>\r\n','','upload_imgss/2.jpg','2019-08-15 13:18:11.689510');
/*!40000 ALTER TABLE `app01_carousel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_category`
--

DROP TABLE IF EXISTS `app01_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) COLLATE utf8_unicode_ci DEFAULT NULL,
  `administrator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_category`
--

LOCK TABLES `app01_category` WRITE;
/*!40000 ALTER TABLE `app01_category` DISABLE KEYS */;
INSERT INTO `app01_category` VALUES (1,'2019风口',1),(2,'行业热点',1),(3,'赚钱APP',1),(4,'游戏热点',1),(5,'生活杂谈',1),(6,'热门网贷APP',1),(7,'励志语录',1);
/*!40000 ALTER TABLE `app01_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_chat`
--

DROP TABLE IF EXISTS `app01_chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_chat` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `username_id` int(11) NOT NULL,
  `chat_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_chat`
--

LOCK TABLES `app01_chat` WRITE;
/*!40000 ALTER TABLE `app01_chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_documentdata`
--

DROP TABLE IF EXISTS `app01_documentdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_documentdata` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `course_price` int(11) NOT NULL,
  `document_data` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `newpic` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `newpic_webp` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `favor_count` int(11) NOT NULL,
  `reply_count` int(11) NOT NULL,
  `focus_count` int(11) NOT NULL,
  `news_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `check_enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_documentdata`
--

LOCK TABLES `app01_documentdata` WRITE;
/*!40000 ALTER TABLE `app01_documentdata` DISABLE KEYS */;
INSERT INTO `app01_documentdata` VALUES (1,2,'临时工200元一天？','临时工200元一天？经常看到这样的临时工招聘广告，是真的吗？','>     临时工200元一天？经常看到这样的临时工招聘广告，是真的吗？也许是的，但是肯定很累。比如工地上搬砖的临时工最低一天赚200。赚钱，有时不必这么累的，现在是移动互联网时代，只要你会手机上网，就能利用手机兼职赚钱的。今天就为你推荐几个手机兼职赚钱的平台，不收任何免费费用，免费兼职，免费赚钱，做好任何一个，每天的收入都不会低于200元。\r\n\r\n临时工200元一天？其实做手机兼职你可以赚更多\r\n![](https://m.43626.cn/zb_users/upload/2019/08/201908101565428996613220.jpg)\r\n\r\n1、高佣联盟-自用省钱，分享赚钱。\r\n\r\n注册：https://m.43626.cn/gy/\r\n\r\n如需邀请码，请写官方邀请码9898\r\n\r\n我们现在都已习惯在网上购物，但是却不知道我们网上买的商品是有返利的。高佣联盟就是这样一款返利app软件，在淘宝上看好商品以后，不要着急下单，复制商品的标题到高佣联盟app去搜索，即可看到隐藏的优惠券和额外的现金返利，你网购了这么多年，是不是感觉亏大了？！所以，别犹豫，赶紧下载安装吧，省钱也是赚钱。\r\n\r\n我们如何赚更多的钱？很简单，点击右下角的发圈，选择你感兴趣的商品转发到自己的朋友圈，当你的朋友购买了你就可以获得提成；不过，高佣联盟最牛逼的不再这里，而是它的无限裂变，无限提成。你邀请了A，A邀请了B，B邀请了C，C邀请了DEFG。。。从ABCDEFG等任何一个人使用高佣联盟返利省钱你都赚钱，这就是它的最大魅力！\r\n\r\n临时工累死累活一天赚200块，可是你看看做好高佣联盟一天赚9000元！真实收款图。\r\n\r\n高佣联盟只要你坚持奋斗3个月，每天最低能赚200元！\r\n![](https://m.43626.cn/zb_users/upload/2019/08/201908101565428541415795.jpg)\r\n\r\n高佣联盟赚钱吗？日赚9000元收益图\r\n\r\n备注：如你已通过上面的链接注册，点击高佣联盟右下角-我的，再点我的团队，可加我微信进我们的专属赚钱交流圈。\r\n\r\n2、趣味星球-手机玩游戏赚钱从这里开始。\r\n\r\n注册：https://m.43626.cn/qwxq/\r\n\r\n如果你喜欢手机玩游戏，那么务必要下载安装趣味星球app，从今天开始可以利用手机玩游戏赚钱了。点击中间的“赚钱”即可看到这里的赚钱游戏了，选择你感兴趣的，按照要求去玩，达到指定的等级要求即可获得趣钻奖励，1万趣钻=1元，提现后24小时之内到账。\r\n\r\n我在这里玩游戏一天轻松赚200元！\r\n\r\n趣味星球日赚200元\r\n![](https://m.43626.cn/zb_users/upload/2019/08/201908101565428732605675.jpg)\r\n\r\n3、快乐赚-最经典的网上兼职赚钱平台。\r\n\r\n注册：https://m.43626.cn/lezhuan/\r\n\r\n快乐赚是目前国内最老的赚钱平台了，不仅支持在手机上赚钱，如果你电脑方便上网的话，也可以登录快乐赚网站去赚钱。\r\n\r\n赚钱模式很简单，玩游戏，做任务，看广告等都可以免费赚钱。\r\n\r\n4、试客小兵-特别适合苹果手机兼职赚钱。\r\n\r\n注册：https://m.43626.cn/shike/\r\n\r\n如果你的手机是苹果的，那么下载安装试客小兵app，简单而言，这是一个任务赚钱平台，简单下载安装一个app软件就可以赚2~3元，赚钱就这么简单，我们简单动动手指即可，如果安装完感觉没用，可以直接删除即可。',0,'document/20170209130422_Broods.txt','upload_imgss/1.jpg','upload_imgss/logo.jpg','http://www.askeds.com/server',1,0,0,1,1,'2019-08-15 13:06:27.080204',1),(3,3,'棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台','喜讯：新人注册就送10元现金红包','![](https://m.43626.cn/zb_users/upload/2019/08/201908141565736304138906.jpg)\r\n**棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台**\r\n棋牌游戏赚钱？棋牌游戏应该是很多人的最爱，饭后或者休息之余，打开棋牌斗地主或者麻将很是娱乐休闲。那么有没有可以赚钱的棋牌游戏？今天就为你推荐一个2019年最适合玩棋牌游戏赚钱的平台-它就是快乐赚。免费注册，免费赚钱，只要你的牌技足够高，收入就足够多。\r\n\r\n注册：https://m.43626.cn/lezhuan/  \r\n<br>\r\n喜讯：新人注册就送10元现金红包\r\n\r\n打开上面的链接，直接选择qq一键登录即可，如果没有qq号，选择其他注册，用你的手机号注册。\r\n\r\n快乐赚打开红包\r\n\r\n点击【疯狂棋牌】，即可看到快乐赚所有的棋牌赚钱游戏，有PC端，有APP的，还有H5棋牌，游戏类型有斗地主，有麻将，打怪兽，还有捕鱼等，总之都是我们常见的棋牌游戏。棋牌游戏的奖励都是很高的，\r\n基本上都在1万元以上。1万乐币=1元，奖励1亿乐币即奖励1万元！\r\n![](https://m.43626.cn/zb_users/upload/2019/08/201908141565736121575801.jpg)\r\n\r\n点击【疯狂棋牌】\r\n\r\n玩棋牌游戏赚钱很简单，按照每款棋牌游戏的要求去玩即可，所谓的要求，其实就是升级游戏等级。\r\n\r\n玩棋牌游戏赚钱一定要选择你喜欢的，常玩的，感兴趣的棋牌游戏。因为每款棋牌游戏的奖励，都是越到最后奖励越高，如果不是自己喜欢的游戏，你很难玩到最后，很难赚到大钱。\r\n\r\n当然了，假如你棋牌游戏玩够了，玩腻了，那么还可以去试玩一些网页赚钱游戏，这里有目前最主流的网页赚钱游戏；\r\n\r\n你还可以去做一些简单的福利任务，福利任务都是一些注册赚钱的项目，赚钱比玩游戏可能更快一些，做完就给钱。但是奖励一般都是几块钱。\r\n\r\n快乐赚这个赚钱平台已经稳定运行5年多了，可以说是一个老平台，支持电脑和手机访问，信誉也是非常好的，佣金日结。我昨天申请的810元佣金，已经到账了。如果还没有找到一个合适的棋牌赚钱游戏平台，那么不妨到这里试一下。\r\n\r\n快乐赚提现810元支付宝已到账\r\n![](https://m.43626.cn/zb_users/upload/2019/08/201908141565736384674690.jpg)',0,'document/20170209130422_Broods.txt','upload_imgss/3.jpg','upload_imgss/logo.jpg','http://www.askeds.com/server',1,0,0,2,1,'2019-08-15 14:01:14.084216',1),(5,3,'2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜','','<table ><tr><td bgcolor=\"#EEEEEE\"> 注：排名是小编从各个赚钱兼职软件实测出来的，这些软件酬劳相对于其它软件是最高的。注：排名是小编从各个赚钱兼职软件实测出来的，这些软件酬劳相对于其它软件是最高的。</td></tr></table>\r\n<div>\r\n<br>\r\n</div>\r\n**第一名 星球联盟**\r\n\r\n<div>\r\n<br>\r\n</div>\r\n星球联盟是由上市公司2345开发出来的软件，在星球联盟中 赚客可以依靠星球联盟中进行下载软件 获取酬劳，也可以安装浏览器就行每日登入进行获取酬劳，当然最令人振奋的是 软件邀请好友功能 返利酬劳高达最低12元 不等的奖赏 还是以每邀请一人进行+1元递增\r\n<div>\r\n<br>\r\n</div>\r\n![](/medias/editor/aa0d3419cd314d14be2c8dfadcea456d_20190815225231862850.jpg)\r\n<div>\r\n<br>\r\n</div>\r\n<div>\r\n<br>\r\n</div>\r\n<div align=\"center\">注册:[http://ais580.com/lexiang/](http://ddkrr.caomeiyonghu.wang/h5/m/c0e17217ae.html?xqid=2135#/yq?code=A6473917770&sign=1_1_1_1 \"xxxxxxx\")</div>\r\n<div>\r\n<br>\r\n</div>\r\n**第二名 应用试客**\r\n<div>\r\n<br>\r\n</div>\r\n应用试客主要是让赚客在软件内下载软件试玩进行获取酬劳，每单下载软件酬劳丰厚，赚客也可以依靠邀请好友赚取10元返利宝不封顶。\r\n<div>\r\n<br>\r\n</div>\r\n![](/medias/editor/bac5becb8fd74ad69934529741a6846c_20190815225246872302.jpg)\r\n<div>\r\n<br>\r\n</div>\r\n<div>\r\n<br>\r\n</div>\r\n<div align=\"center\">注册:[http://ais580.com/lexiang/](https://shike.com/i/QXmwsyE \"http://ais580.com/lexiang/\")</div>\r\n<div>\r\n<br>\r\n</div>\r\n**第三名 趣头条**\r\n<div>\r\n<br>\r\n</div>\r\n趣头条是依靠阅读视频、新闻就能获取酬劳的新闻软件，趣头条的酬劳模式、盈利收入在众多赚钱APP中算的上是不错了，当然在邀请好友进入赚钱上自然不会输给其它赚钱APP，趣头条邀请好友会得到最低9元不等的酬劳，其中每邀一人+1递增。\r\n<div>\r\n<br>\r\n</div>\r\n\r\n![](/medias/editor/88860f36af3b4d978fc9060f1b34f77f_20190815225312838234.jpg)\r\n<div>\r\n<br>\r\n</div>\r\n<div>\r\n<br>\r\n</div>\r\n<div align=\"center\">注册:[http://ais580.com/lexiang/](http://t.yoo-mall.net/534264.html \"xxx\")</div>\r\n<div>\r\n<br>\r\n</div>\r\n**第四名众人帮**\r\n<div>\r\n<br>\r\n</div>\r\n众人帮主要依靠别人发布任务 你去接单来获取酬劳，你也可以邀请好友进行好友获取的酬劳进行返利，也就是说好友赚到100块你会获取软件93块的奖赏，当然你可以选择签到来获取奖赏\r\n<div>\r\n<br>\r\n</div>\r\n![](/medias/editor/a15de1769b38456b8c0c59d3df4997af_20190815225325535882.jpg)\r\n<div>\r\n<br>\r\n</div>\r\n<div>\r\n<br>\r\n</div>\r\n<div align=\"center\">注册:[http://ais580.com/lexiang/](http://my.zrb.life/earn-11213581 \"xxx\")</div>\r\n<div>\r\n<br>\r\n</div>\r\n**第五名 搜狐资迅**\r\n<div>\r\n<br>\r\n</div>\r\n在搜狐资迅软件里赚客主要是依靠浏览新闻赚取酬劳，还可以做软件签到与其它任务赚取酬劳，当然你还可以邀请好友 获取大额返利不限人数。\r\n<div>\r\n<br>\r\n</div>\r\n![](/medias/editor/5cbd662dc7444e87abc48278b2ebfaab_20190815225342002851.jpg)\r\n<div>\r\n<br>\r\n</div>\r\n<div>\r\n<br>\r\n</div>\r\n<div align=\"center\">注册:[http://ais580.com/lexiang/](https://ss.sohu.com/infonews/invite/register/5d1e83bd572c8c00019e92f8/1?channel=18&activityId=10202&app=&social_media=1&from=singlemessage \"ww\")</div>',0,'document/20170209130422_Broods.txt','upload_imgss/aa0d3419cd314d14be2c8dfadcea456d_mOCHnSP.jpg','upload_imgss/logo.jpg','http://www.askeds.com/server',0,0,0,2,1,'2019-08-15 23:21:56.504702',1),(6,6,'2019靠谱良心的网贷借贷APP软件平台前十名排行集合','','1.软件简介：360借条是360推出的一款借贷app，只提供小额的借贷服务，用户申请贷款，只需要刷脸通过审核，就可轻松获取高额度，最大的特点是：审核速度快，还款方便，基于是360旗下的，所以安全有保障。。\r\n\r\n推荐理由：不需要借款人提供任何的抵押物，可以直接申请;额度可以循环使用，随借随还;线上审核，最高可借20万，日息最低0.027%，还款方式灵活还有免息卷可领，通过率高。\r\n\r\n\r\n<div><br></div>\r\n![](/medias/editor/e70de87ad7a34e5b9a13c396ca0016d0_20190816085937508146.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://cdn-daikuan.360jie.com.cn/dir_mkteditor/activity/discount3-mgmall/discount3-mgmall-1.html?u=UR5164151058765336576&t=1562543444813&bz=CASHMGM&utm_source=CH_308&utm_medium=qq&p=360JIETIAO&utm_campaign=12mianshouqi_mgm_yaoqingsongxianjin&a=12mianshouqi_mgm_yaoqingsongxianjin \"xxxx\")</div>\r\n<div><br></div>\r\n2.软件简介：玖富万卡，是玖富集团推出的一款专属信用借贷产品，信用越高，额度越大。流程便捷，3步开卡；高效审核，快速放款，最快一天内到账；低息分期，额度实时恢复。玖富万卡，带给您全新的生活体验。\r\n\r\n<div><br></div>\r\n![](/medias/editor/1419f6fa47fa4407bdb93361824a305f_20190816085952090471.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://onecard.9fbank.com/share/#/register?name=%E6%B1%AA%E9%99%88%E6%9D%89&mobile=MTUyNjAyODM4NjI=&inviteRcode=2019063001503763624718662&actCode=PVmUSDrc \"xxx\")</div>\r\n<div><br></div>\r\n3.软件简介：闪电借款是“国”字号的中国互联网金融协会的理事会员单位掌众金服 [1-3]于2014年3月推出的一个基于移动端的现金借贷平台，是会员邀请制借贷平台，主要为用户提供短期的小额急借的现金借贷服务。用户通过授信认证获得授信额度，在额度内随时可进行借款，借款额度在1000元-10000元之间。以56秒到账的闪电速度，成为年轻人的掌上ATM\r\n\r\n<div><br></div>\r\n![](/medias/editor/u=2727848840,3564891988&fm=214&gp=0_20190816091528646418.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://jiekuan.weshare.com.cn/activity/inviteLanding.html?inviterName=%E6%B1%AA%E9%99%88%E6%9D%89&inviterMobile=15260283862&inviterPortraitUrl=null&inviterCode=1XIKRE&wechatGid=47e3b3e7-9f26-428d-b7f8-5e8d1518eb0b \"xxxx\")</div>\r\n<div><br></div>\r\n4.软件简介：用钱宝是一款帮助用户获取分期消费信贷服务的产品。依托人工智能风控技术，通过与金融服务生态中的各机构深度合作，为用户提供合理、高效、省心的消费信贷服务。\r\n\r\n\r\n<div><br></div>\r\n![](/medias/editor/e93c0ed8be134934bcae07327cf8d0c5_20190816090015769633.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://websets.yongqianbao.com/inviteRegister.html#/?ac_token=InlxYi4xNTI2MDI4Mzg2Mi40NDEyOTAxOSI%3A1hhZw1%3A8CGLnDjHizTwzMdHZ641KuX89vI&sms_code_url=https%3A%2F%2Fcompass-ug.yongqianbao.com%2Factivity%2Fapi%2Fv1%2Factivity%2Fsend_verify_app_invite&bind_url=https%3A%2F%2Fcompass-ug.yongqianbao.com%2Factivity%2Fapi%2Fv1%2Factivity%2Fh5_app_invite_bind_yqb \"xxx\")</div>\r\n<div><br></div>\r\n5.软件简介：招联金融：由招行与联通共同组建，银监会消费金融持牌机构；提供现金借贷、分期消费服务\r\n\r\n<div><br></div>\r\n![](/medias/editor/f385608675ef414aba3243f4fe2e3354_20190816090030428944.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://act.mucfc.com/na/15439235550150048/m2.html#noForceLogin?mgm=jwj8dx2ax065x \"xxx\")</div>\r\n<div><br></div>\r\n6.软件简介：还呗是一款信用卡账单分期APP，服务广大信用卡持卡人，帮用户解决信用卡难题。 还呗APP于2016年6月进入市场，由数禾科技与分众小贷联合运营。\r\n\r\n<div><br></div>\r\n![](/medias/editor/67814083cba348ae893c13ebcef1e495_20190816090043837849.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://c.lattebank.com/hbmgm/c50/490?uid=d7cd25bb-5458-4ee4-8bc8-94a86ea915d6 \"xxx\")</div>\r\n<div><br></div>\r\n7.软件简介:“小米贷款”是面向小米用户的纯信用、无抵押贷款产品，在小米金融对用户行为综合评估后明确相应的贷款额度，单笔贷款额度最低为100元，最高为用户的可用额度。\r\n\r\n<div><br></div>\r\n![](/medias/editor/e278046bae954b33a083d9c447d869ee_20190816090055293310.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://api.jr.mi.com/loan/activity/201808/invitenewuser/?from=local&inviteCode=aix18u#/invited \"xxx\")</div>\r\n<div><br></div>\r\n8.软件简介：苏宁金融一直定位于普惠金融，充分地为大众提供适当的、有效的金融服务，任性付正是实践苏宁普惠金融的重要助力。任性付依托大数据和云计算，对于已邀请授信的客户，最短1分钟即可放款，单个用户最高授信额度可达20万元。围绕上游供应商和下游用户的融资、理财、信用消费等方面的金融需求，苏宁小贷已经累计为近万家合作伙伴提供了570多亿的贷款，苏宁众筹上线累计筹集额近15亿元，一直稳居行业前三。随着银行牌照的获批，苏宁金融已经成为牌照非常全的民营金融产业集团。\r\n\r\n<div><br></div>\r\n![](/medias/editor/37bfe41df8b74ab3b352954a632b2b6b_20190816090107469845.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://funion.suning.com/moulds/accept?channelKey=qmyx&userSign=59a88e7f5338407588b6f8cbb3cee65d \"xxx\")</div>\r\n<div><br></div>\r\n9.软件简介：“度小满”（百度旗下）这一名称，取意“源自百度，小得盈满，前行不止”。“度”是延承百度技术基因，“小满”是节气，更是一种小得盈满、恰到好处的人生状态。这也是度小满金融想与用户分享的生活态度：永远谦逊有节、值得信赖；永远前行不止、追寻美好的生活。 度小满的品牌Logo由红蓝两色组成，代表消费金融和财富管理两大业务平台。\r\n\r\n<div><br></div>\r\n![](/medias/editor/74cb37575764497ebdf7c95a7c909854_20190816090117796720.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://qianbao.baidu.com/static/fe-ppp/invited.html?activity_id=9410&invite_code=CZ9X2ROO1E&qq-pf-to=pcqq.c2c \"xxx\")</div>\r\n<div><br></div>\r\n10.软件简介：活力花平台服务:指活力花及其合作服务方基于互联网，通过活力花业务向您提供的包括但不限于在线消费金融、金融信息技术服务等互联网金融服务类业务及支付转账、消费、娱乐、资讯、交通出行、生活服务等各类服务，兼容自有业务产品、外接第三方业务产品服务\r\n\r\n<div><br></div>\r\n![](/medias/editor/48660c9fe30e4e378e75d05c80418f90_20190816090133380326.jpg)\r\n<div><br></div>\r\n<div align=\"center\">下载地址：[http://ais580.com/lexiang/](https://hlh.qingchunbank.com/huolihua/register?source=REFERRAL&entrance=friends2&iCode=a10d335b-f161-4eb8-ad2d-923bc9026c3d&from=singlemessage \"xxx\")</div>',0,'document/20170209130422_Broods.txt','upload_imgss/e70de87ad7a34e5b9a13c396ca0016d0.jpg','upload_imgss/logo.jpg','http://www.askeds.com/server',1,0,0,1,1,'2019-08-16 01:08:25.584951',1);
/*!40000 ALTER TABLE `app01_documentdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_documentdata_focususer`
--

DROP TABLE IF EXISTS `app01_documentdata_focususer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_documentdata_focususer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `documentdata_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `documentdata_id` (`documentdata_id`,`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_documentdata_focususer`
--

LOCK TABLES `app01_documentdata_focususer` WRITE;
/*!40000 ALTER TABLE `app01_documentdata_focususer` DISABLE KEYS */;
INSERT INTO `app01_documentdata_focususer` VALUES (16,1,1),(38,6,1);
/*!40000 ALTER TABLE `app01_documentdata_focususer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_goodslist`
--

DROP TABLE IF EXISTS `app01_goodslist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_goodslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `list_uuid` char(32) COLLATE utf8_unicode_ci NOT NULL,
  `total_num` int(11) NOT NULL,
  `total_price` int(11) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `buyers` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `ifpay` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_goodslist`
--

LOCK TABLES `app01_goodslist` WRITE;
/*!40000 ALTER TABLE `app01_goodslist` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_goodslist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_goodslist_total_goods`
--

DROP TABLE IF EXISTS `app01_goodslist_total_goods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_goodslist_total_goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodslist_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `goodslist_id` (`goodslist_id`,`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_goodslist_total_goods`
--

LOCK TABLES `app01_goodslist_total_goods` WRITE;
/*!40000 ALTER TABLE `app01_goodslist_total_goods` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_goodslist_total_goods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_gotvideo`
--

DROP TABLE IF EXISTS `app01_gotvideo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_gotvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) NOT NULL,
  `buyers` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `buyers` (`buyers`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_gotvideo`
--

LOCK TABLES `app01_gotvideo` WRITE;
/*!40000 ALTER TABLE `app01_gotvideo` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_gotvideo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_gotvideo_myvideo`
--

DROP TABLE IF EXISTS `app01_gotvideo_myvideo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_gotvideo_myvideo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gotvideo_id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gotvideo_id` (`gotvideo_id`,`news_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_gotvideo_myvideo`
--

LOCK TABLES `app01_gotvideo_myvideo` WRITE;
/*!40000 ALTER TABLE `app01_gotvideo_myvideo` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_gotvideo_myvideo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_news`
--

DROP TABLE IF EXISTS `app01_news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) DEFAULT NULL,
  `title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `summary` varchar(256) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content` longtext COLLATE utf8_unicode_ci,
  `course_price` int(11) NOT NULL,
  `weixinnum` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `video` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `videourl` varchar(5000) COLLATE utf8_unicode_ci DEFAULT NULL,
  `newpic` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `newpic_webp` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(200) COLLATE utf8_unicode_ci DEFAULT NULL,
  `videos_url` longtext COLLATE utf8_unicode_ci,
  `favor_count` int(11) NOT NULL,
  `reply_count` int(11) NOT NULL,
  `focus_count` int(11) NOT NULL,
  `news_type_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  `check_enable` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `app01_news_category_id_6b7d941e3803ac4_fk_app01_category_id` (`category_id`),
  KEY `app01_news_news_type_id_699bbedf2716e804_fk_app01_newtype_id` (`news_type_id`),
  KEY `app01_news_user_id_6722e4c45bf9ed2d_fk_app01_admin_id` (`user_id`),
  CONSTRAINT `app01_news_category_id_6b7d941e3803ac4_fk_app01_category_id` FOREIGN KEY (`category_id`) REFERENCES `app01_category` (`id`),
  CONSTRAINT `app01_news_news_type_id_699bbedf2716e804_fk_app01_newtype_id` FOREIGN KEY (`news_type_id`) REFERENCES `app01_newtype` (`id`),
  CONSTRAINT `app01_news_user_id_6722e4c45bf9ed2d_fk_app01_admin_id` FOREIGN KEY (`user_id`) REFERENCES `app01_admin` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_news`
--

LOCK TABLES `app01_news` WRITE;
/*!40000 ALTER TABLE `app01_news` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_news_focususer`
--

DROP TABLE IF EXISTS `app01_news_focususer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_news_focususer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `news_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_id` (`news_id`,`user_id`),
  CONSTRAINT `app01_news_focususer_news_id_54c69faf70f1719_fk_app01_news_id` FOREIGN KEY (`news_id`) REFERENCES `app01_news` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_news_focususer`
--

LOCK TABLES `app01_news_focususer` WRITE;
/*!40000 ALTER TABLE `app01_news_focususer` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_news_focususer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_newtype`
--

DROP TABLE IF EXISTS `app01_newtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_newtype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `display` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_newtype`
--

LOCK TABLES `app01_newtype` WRITE;
/*!40000 ALTER TABLE `app01_newtype` DISABLE KEYS */;
INSERT INTO `app01_newtype` VALUES (1,'临时工200元一天'),(2,'手机兼职赚钱'),(3,'热门网贷app');
/*!40000 ALTER TABLE `app01_newtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_reply`
--

DROP TABLE IF EXISTS `app01_reply`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_reply` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` longtext COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) NOT NULL,
  `new_id` int(11) NOT NULL,
  `create_date` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_reply`
--

LOCK TABLES `app01_reply` WRITE;
/*!40000 ALTER TABLE `app01_reply` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_reply` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_serverclient`
--

DROP TABLE IF EXISTS `app01_serverclient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_serverclient` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `serverclient` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_serverclient`
--

LOCK TABLES `app01_serverclient` WRITE;
/*!40000 ALTER TABLE `app01_serverclient` DISABLE KEYS */;
/*!40000 ALTER TABLE `app01_serverclient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `app01_usertype`
--

DROP TABLE IF EXISTS `app01_usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `app01_usertype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dispaly` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `app01_usertype`
--

LOCK TABLES `app01_usertype` WRITE;
/*!40000 ALTER TABLE `app01_usertype` DISABLE KEYS */;
INSERT INTO `app01_usertype` VALUES (1,'管理员');
/*!40000 ALTER TABLE `app01_usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `group_id` (`group_id`,`permission_id`),
  KEY `auth_group__permission_id_4df49c0e5199175d_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_group__permission_id_4df49c0e5199175d_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_be08776ac4b0d26_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_type_id` (`content_type_id`,`codename`),
  CONSTRAINT `auth__content_type_id_16139c044a589aae_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add 图片轮播',7,'add_carousel'),(20,'Can change 图片轮播',7,'change_carousel'),(21,'Can delete 图片轮播',7,'delete_carousel'),(22,'Can add 广告位',8,'add_advertising'),(23,'Can change 广告位',8,'change_advertising'),(24,'Can delete 广告位',8,'delete_advertising'),(25,'Can add 视频',9,'add_news'),(26,'Can change 视频',9,'change_news'),(27,'Can delete 视频',9,'delete_news'),(28,'Can add 发布文章',10,'add_documentdata'),(29,'Can change 发布文章',10,'change_documentdata'),(30,'Can delete 发布文章',10,'delete_documentdata'),(31,'Can add 访问量',11,'add_serverclient'),(32,'Can change 访问量',11,'change_serverclient'),(33,'Can delete 访问量',11,'delete_serverclient'),(34,'Can add 账户',12,'add_admin'),(35,'Can change 账户',12,'change_admin'),(36,'Can delete 账户',12,'delete_admin'),(37,'Can add 用户类型',13,'add_usertype'),(38,'Can change 用户类型',13,'change_usertype'),(39,'Can delete 用户类型',13,'delete_usertype'),(40,'Can add 标签云',14,'add_newtype'),(41,'Can change 标签云',14,'change_newtype'),(42,'Can delete 标签云',14,'delete_newtype'),(43,'Can add 评论',15,'add_reply'),(44,'Can change 评论',15,'change_reply'),(45,'Can delete 评论',15,'delete_reply'),(46,'Can add 导航栏',16,'add_category'),(47,'Can change 导航栏',16,'change_category'),(48,'Can delete 导航栏',16,'delete_category'),(61,'Can add My basic example (Path)',21,'add_mymetadatapath'),(62,'Can change My basic example (Path)',21,'change_mymetadatapath'),(63,'Can delete My basic example (Path)',21,'delete_mymetadatapath'),(64,'Can add My basic example (Model Instance)',22,'add_mymetadatamodelinstance'),(65,'Can change My basic example (Model Instance)',22,'change_mymetadatamodelinstance'),(66,'Can delete My basic example (Model Instance)',22,'delete_mymetadatamodelinstance'),(67,'Can add My basic example (Model)',23,'add_mymetadatamodel'),(68,'Can change My basic example (Model)',23,'change_mymetadatamodel'),(69,'Can delete My basic example (Model)',23,'delete_mymetadatamodel'),(70,'Can add My basic example (View)',24,'add_mymetadataview'),(71,'Can change My basic example (View)',24,'change_mymetadataview'),(72,'Can delete My basic example (View)',24,'delete_mymetadataview');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `first_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(254) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
INSERT INTO `auth_user` VALUES (1,'pbkdf2_sha256$20000$7PHu7r01swCe$I3hyjwzXUmQal5QpFBqnbxKrEG8pdFppEUpquS54np4=','2019-08-16 02:03:34.837957',1,'admin','','','admin@qq.com',1,1,'2019-08-15 12:42:35.359171');
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_7f40f1e25ebc37d0_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_7f40f1e25ebc37d0_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_3ae1601a8f0a416a_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`,`permission_id`),
  KEY `auth_user_u_permission_id_3d0e22eebf5fc432_fk_auth_permission_id` (`permission_id`),
  CONSTRAINT `auth_user_u_permission_id_3d0e22eebf5fc432_fk_auth_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_user_user_permissi_user_id_29c93ce85b66a14b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext COLLATE utf8_unicode_ci,
  `object_repr` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext COLLATE utf8_unicode_ci NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `djang_content_type_id_14a016d563f87e82_fk_django_content_type_id` (`content_type_id`),
  KEY `django_admin_log_user_id_6feb89afb207bfb3_fk_auth_user_id` (`user_id`),
  CONSTRAINT `djang_content_type_id_14a016d563f87e82_fk_django_content_type_id` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_6feb89afb207bfb3_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2019-08-15 12:51:42.473011','1','管理员',1,'',13,1),(2,'2019-08-15 12:53:45.570374','1','admin',1,'',12,1),(3,'2019-08-15 12:53:48.338788','1','2019风口',1,'',16,1),(4,'2019-08-15 12:54:04.713515','2','行业热点',1,'',16,1),(5,'2019-08-15 12:54:23.653061','3','赚钱APP',1,'',16,1),(6,'2019-08-15 12:55:14.202668','4','游戏热点',1,'',16,1),(7,'2019-08-15 12:56:04.881703','5','生活杂谈',1,'',16,1),(8,'2019-08-15 12:57:13.496499','6','热门网贷APP',1,'',16,1),(9,'2019-08-15 12:57:27.180145','7','励志语录',1,'',16,1),(10,'2019-08-15 13:06:21.882498','1','临时工200元一天',1,'',14,1),(11,'2019-08-15 13:06:27.084153','1','临时工200元一天？其实做手机兼职你可以赚更多',1,'',10,1),(12,'2019-08-15 13:07:40.514295','1','临时工200元一天？',2,'已修改 title 和 summary 。',10,1),(13,'2019-08-15 13:18:11.691512','1','真正努力的人，其实都很低调',1,'',7,1),(14,'2019-08-15 13:48:38.372773','2','21',1,'',10,1),(15,'2019-08-15 13:50:07.761194','2','21',2,'已修改 newpic 。',10,1),(16,'2019-08-15 13:50:16.486198','2','21',2,'已修改 check_enable 。',10,1),(17,'2019-08-15 13:52:58.547526','2','21',2,'已修改 content 。',10,1),(18,'2019-08-15 13:53:23.010181','2','21',3,'',10,1),(19,'2019-08-15 14:01:05.814874','2','赚钱方法',1,'',14,1),(20,'2019-08-15 14:01:14.086853','3','棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台',1,'',10,1),(21,'2019-08-15 14:03:36.920754','3','棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台',2,'已修改 newpic 。',10,1),(22,'2019-08-15 14:34:41.502168','2','手机兼职赚钱',2,'已修改 display 。',14,1),(23,'2019-08-15 14:54:26.334251','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',1,'',10,1),(24,'2019-08-15 14:59:55.074725','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 check_enable 和 focususer 。',10,1),(25,'2019-08-15 15:02:06.448809','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(26,'2019-08-15 15:07:08.107778','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(27,'2019-08-15 15:10:09.630158','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(28,'2019-08-15 15:12:34.704751','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'没有字段被修改。',10,1),(29,'2019-08-15 15:12:34.852077','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'没有字段被修改。',10,1),(30,'2019-08-15 15:16:09.564773','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(31,'2019-08-15 15:20:09.318506','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(32,'2019-08-15 15:23:03.777757','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content，newpic 和 newpic_webp 。',10,1),(33,'2019-08-15 15:28:14.253559','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 summary 和 content 。',10,1),(34,'2019-08-15 15:34:48.483216','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(35,'2019-08-15 15:36:43.936744','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(36,'2019-08-15 15:37:35.416603','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(37,'2019-08-15 15:38:12.297654','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(38,'2019-08-15 15:38:37.463396','1','临时工200元一天？',2,'已修改 content 。',10,1),(39,'2019-08-15 15:38:52.954213','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(40,'2019-08-15 15:39:03.827180','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(41,'2019-08-15 15:40:42.991463','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(42,'2019-08-15 15:42:15.248181','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'没有字段被修改。',10,1),(43,'2019-08-15 15:43:17.589702','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(44,'2019-08-15 15:43:22.098715','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(45,'2019-08-15 15:46:08.924891','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'没有字段被修改。',10,1),(46,'2019-08-15 15:46:58.937172','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(47,'2019-08-15 15:49:12.390800','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(48,'2019-08-15 15:52:56.803835','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(49,'2019-08-15 15:53:06.446859','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(50,'2019-08-15 15:53:51.271896','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(51,'2019-08-15 15:56:29.314039','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(52,'2019-08-15 15:57:06.258283','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(53,'2019-08-15 15:58:55.063284','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(54,'2019-08-15 15:59:06.495391','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(55,'2019-08-15 16:00:21.631815','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(56,'2019-08-15 16:00:56.055743','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(57,'2019-08-15 16:01:16.589587','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(58,'2019-08-15 16:01:48.466575','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',2,'已修改 content 。',10,1),(59,'2019-08-15 16:03:08.461915','4','2019可用好赚钱的兼职赚钱软件APP前五排行榜集合',3,'',10,1),(60,'2019-08-15 16:05:52.984141','3','棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台',2,'已修改 content 。',10,1),(61,'2019-08-15 16:06:58.736815','3','棋牌游戏赚钱：2019年最适合玩棋牌游戏赚钱的平台',2,'已修改 content 。',10,1),(62,'2019-08-15 23:21:56.506955','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',1,'',10,1),(63,'2019-08-15 23:24:21.799413','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(64,'2019-08-15 23:28:14.772479','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content，newpic，favor_count 和 focususer 。',10,1),(65,'2019-08-15 23:29:10.496432','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(66,'2019-08-15 23:30:02.689414','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(67,'2019-08-15 23:32:52.464065','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(68,'2019-08-15 23:34:31.899931','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(69,'2019-08-15 23:35:29.101188','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(70,'2019-08-15 23:36:33.665738','5','2019年可用好赚钱的兼职赚钱软件APP前五名排行榜集合新鲜',2,'已修改 content 。',10,1),(71,'2019-08-16 01:08:25.587874','6','2019靠谱良心的网贷借贷APP软件平台前十名排行集合',1,'',10,1),(72,'2019-08-16 01:09:10.026841','3','热门网贷app',1,'',14,1),(73,'2019-08-16 01:11:38.646771','6','2019靠谱良心的网贷借贷APP软件平台前十名排行集合',2,'已修改 category，content 和 news_type 。',10,1),(74,'2019-08-16 01:12:58.883798','6','2019靠谱良心的网贷借贷APP软件平台前十名排行集合',2,'已修改 content 。',10,1),(75,'2019-08-16 01:15:31.886716','6','2019靠谱良心的网贷借贷APP软件平台前十名排行集合',2,'已修改 content 。',10,1),(76,'2019-08-16 01:16:56.507747','6','2019靠谱良心的网贷借贷APP软件平台前十名排行集合',2,'已修改 content 和 newpic 。',10,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `model` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_110eccd73d23fc4a_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(12,'app01','admin'),(8,'app01','advertising'),(7,'app01','carousel'),(16,'app01','category'),(10,'app01','documentdata'),(9,'app01','news'),(14,'app01','newtype'),(15,'app01','reply'),(11,'app01','serverclient'),(13,'app01','usertype'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(23,'djangoseo','mymetadatamodel'),(22,'djangoseo','mymetadatamodelinstance'),(21,'djangoseo','mymetadatapath'),(24,'djangoseo','mymetadataview'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2019-08-15 12:41:47.523470'),(2,'auth','0001_initial','2019-08-15 12:41:48.420975'),(3,'admin','0001_initial','2019-08-15 12:41:48.657382'),(4,'contenttypes','0002_remove_content_type_name','2019-08-15 12:41:48.842671'),(5,'auth','0002_alter_permission_name_max_length','2019-08-15 12:41:48.935111'),(6,'auth','0003_alter_user_email_max_length','2019-08-15 12:41:49.691282'),(7,'auth','0004_alter_user_username_opts','2019-08-15 12:41:49.712801'),(8,'auth','0005_alter_user_last_login_null','2019-08-15 12:41:49.790314'),(9,'auth','0006_require_contenttypes_0002','2019-08-15 12:41:49.796278'),(10,'sessions','0001_initial','2019-08-15 12:41:49.861085');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `session_data` longtext COLLATE utf8_unicode_ci NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_de54fa62` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('5ywfhc3orzigbia9lycaopp8ao8spg0q','OGRmODhkN2UyZTVhMGQ2NGRmNzU1NzU2MzU1NjJiOTg5NDA1YzVkZjp7ImlzX2xvZ2luIjoiYWRtaW4iLCJjdXJyZW50X3VzZXJfaWQiOjF9','2019-08-29 13:14:18.779820'),('96k43vanibmff4yndswkd0kfo8as49sm','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 14:31:41.808623'),('as6qn2y23bpq0al80fpcarf6f45nc2jp','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 14:11:08.861136'),('e11ev52dnw55hoxxqq6rzjde38ba1ez0','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 15:11:28.380977'),('i58uzk577mph4t33znol9de731popvsm','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 14:44:34.717766'),('lv27n09bkrpbi5ktwrpkco0lyf5u3qvf','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-30 01:39:16.030884'),('o8ncoabqf5qcxo6ds75vtzyzevc7ppgs','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-30 02:03:34.842914'),('yu5zxyv5g24fg9z0uz9wxivxww1v8epg','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 15:28:21.390178'),('zn1mif2fma86ugkcrupue6z2jv0ps6l1','M2NhOTRlMjUxZTFiZTZmNGM0ZTQ0YzJmOGVlNzIxMWJhYTdlZGFjMDp7Il9hdXRoX3VzZXJfaGFzaCI6ImJlODFhZmZiZjViNjUyMWZmZjFhNGRkNTNjYzNmMTgyMjVlZjdjYjIiLCJfYXV0aF91c2VyX2JhY2tlbmQiOiJkamFuZ28uY29udHJpYi5hdXRoLmJhY2tlbmRzLk1vZGVsQmFja2VuZCIsIl9hdXRoX3VzZXJfaWQiOiIxIn0=','2019-08-29 12:51:01.592417');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `djangoseo_mymetadatamodel`
--

DROP TABLE IF EXISTS `djangoseo_mymetadatamodel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `djangoseo_mymetadatamodel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(68) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  `keywords` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `_content_type_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `_content_type_id` (`_content_type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `djangoseo_mymetadatamodel`
--

LOCK TABLES `djangoseo_mymetadatamodel` WRITE;
/*!40000 ALTER TABLE `djangoseo_mymetadatamodel` DISABLE KEYS */;
/*!40000 ALTER TABLE `djangoseo_mymetadatamodel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `djangoseo_mymetadatamodelinstance`
--

DROP TABLE IF EXISTS `djangoseo_mymetadatamodelinstance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `djangoseo_mymetadatamodelinstance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(68) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  `keywords` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `_path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `_content_type_id` int(11) NOT NULL,
  `_object_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `_path` (`_path`),
  UNIQUE KEY `_content_type_id` (`_content_type_id`,`_object_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `djangoseo_mymetadatamodelinstance`
--

LOCK TABLES `djangoseo_mymetadatamodelinstance` WRITE;
/*!40000 ALTER TABLE `djangoseo_mymetadatamodelinstance` DISABLE KEYS */;
/*!40000 ALTER TABLE `djangoseo_mymetadatamodelinstance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `djangoseo_mymetadatapath`
--

DROP TABLE IF EXISTS `djangoseo_mymetadatapath`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `djangoseo_mymetadatapath` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(68) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  `keywords` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `_path` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `_path` (`_path`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `djangoseo_mymetadatapath`
--

LOCK TABLES `djangoseo_mymetadatapath` WRITE;
/*!40000 ALTER TABLE `djangoseo_mymetadatapath` DISABLE KEYS */;
/*!40000 ALTER TABLE `djangoseo_mymetadatapath` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `djangoseo_mymetadataview`
--

DROP TABLE IF EXISTS `djangoseo_mymetadataview`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `djangoseo_mymetadataview` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(68) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(155) COLLATE utf8_unicode_ci NOT NULL,
  `keywords` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `heading` varchar(511) COLLATE utf8_unicode_ci NOT NULL,
  `_view` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `_view` (`_view`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `djangoseo_mymetadataview`
--

LOCK TABLES `djangoseo_mymetadataview` WRITE;
/*!40000 ALTER TABLE `djangoseo_mymetadataview` DISABLE KEYS */;
/*!40000 ALTER TABLE `djangoseo_mymetadataview` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-08-16 10:07:21

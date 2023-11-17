import itertools

# lis1 = ['a','b']
# lis2 = ['11','22','33','44']
# lis3 = ['居居','囧囧','大大']
# res = itertools.product(lis1,lis2,lis3)
# print('item', res)
# for one,two,three in itertools.product(lis1,lis2,lis3):
#     print('one', one)
#     print('two', two)
#     print('three', three)



lis1 = [
	{
		'selectKey': '4100',
		'servCode': 'I_getSession',
		'taskType': '接口',
		'taskCode': 'henan_get_session',
		'loginTaskCode': 'henan_get_session',
		'inputConvertEnable': 0,
		'inputConvertScriptCode': '',
		'outputConvertEnable': 0,
		'outputConvertScriptCode': ''
	},
]
lis2 = [
	{
		'selectKey': '4100',
		'servCode': 'I_getSession',
		'taskType': 'rpa',
		'taskCode': 'henan_get_session',
		'loginTaskCode': 'henan_get_session',
		'inputConvertEnable': 0,
		'inputConvertScriptCode': '',
		'outputConvertEnable': 0,
		'outputConvertScriptCode': ''
	},
	{
		'selectKey': '4100',
		'servCode': 'I_verifyAccount',
		'taskType': '接口',
		'taskCode': 'henan_api_verify_login',
		'loginTaskCode': 'henan_api_verify_login',
		'inputConvertEnable': 0,
		'inputConvertScriptCode': '',
		'outputConvertEnable': 0,
		'outputConvertScriptCode': ''
	},
	{
		'selectKey': '4100',
		'servCode': 'I_verifySession',
		'taskType': 'RPA',
		'taskCode': 'henan_api_valid_session',
		'loginTaskCode': 'henan_api_valid_session',
		'inputConvertEnable': 0,
		'inputConvertScriptCode': '',
		'outputConvertEnable': 0,
		'outputConvertScriptCode': ''
	},
	{
		'selectKey': '4100',
		'servCode': 'G_wjsxx',
		'taskType': '接口',
		'taskCode': 'henan_wjsxx',
		'loginTaskCode': 'henan_get_session',
		'inputConvertEnable': 1,
		'inputConvertScriptCode': 'T_tyqqcl_henan',
		'outputConvertEnable': 1,
		'outputConvertScriptCode': 'T_wjsxx_henan'
	},
]
lis3 = [
{
		'selectKey': '1100',
		'servCode': 'G_sylb_xxcj_fcs',
		'taskType': '粑粑',
		'taskCode': 'beijing_sylb_xxcj_fcs',
		'loginTaskCode': 'beijing_autologin',
		'inputConvertEnable': 1,
		'inputConvertScriptCode': 'T_tyqqcl_henan',
		'outputConvertEnable': 1,
		'outputConvertScriptCode': 'T_sylb_xxcj_fcs_beijing'
	},
	{
		'selectKey': '1100',
		'servCode': 'G_syqc_fcs_add',
		'taskType': '吃饭',
		'taskCode': 'beijing_syqc_fcs_add',
		'loginTaskCode': 'beijing_autologin',
		'inputConvertEnable': 1,
		'inputConvertScriptCode': 'T_tyqqcl_henan',
		'outputConvertEnable': 1,
		'outputConvertScriptCode': 'T_syqc_fcs_add_beijing'
	},

	#标注数据!!!
{
		'selectKey': '4100',
		'servCode': 'I_getSession',
		'taskType': 'rpa',
		'taskCode': 'henan_get_session',
		'loginTaskCode': 'henan_get_session',
		'inputConvertEnable': 0,
		'inputConvertScriptCode': '',
		'outputConvertEnable': 0,
		'outputConvertScriptCode': ''
	},
]




#列表中的字典转元组
def dict_to_tup(lis):
	tmpSet = set()
	for i in range(len(lis)):
		tupItem = tuple(lis[i].items())
		tmpSet.add(tupItem)
	return tmpSet

tmpLis1 = dict_to_tup(lis1)
tmpLis2 = dict_to_tup(lis2)
tmpLis3 = dict_to_tup(lis3)

# print('tmpLis1', tmpLis1)


def compar_dic(tmpLis1, tmpLis2):
    """
    Args:
        list1: 3个环境之一的服务配置数据
        list2: 3个环境之一的服务配置数据
        list3: 3个环境之一的服务配置数据
        envArr: 环境名称数组，有三个元素【测试、预发、生产】
    Returns: 返回3个环境数据比对比对结果
    """
    # 标注出不一致键值的键名
    noSameKey = []
    # 定义状态
    pre_status = False
    boss_status = False

    for test, pre in itertools.product(tmpLis1, tmpLis2):
        sgin_test = test[0][1] + '_' + test[1][1]
        sgin_pre = pre[0][1] + '_' + pre[1][1]

        curTestDict = dict((x, y) for x, y in test)
        curPreDict = dict((x, y) for x, y in pre)

        # 三个环境都已经配置对应地区以及服务编码的情况
        if sgin_test == sgin_pre:
            pre_status = True
            for key in range(len(test)):
                if test[key][1] == pre[key][1]:
                    continue
                else:
                    noSameKey.append({
                        f'地区{sgin_test}编码标记2测试、预发、生产环境配置不一致': {
                        f'测试环境的{test[key][0]}为': test[key][1],
                        f'预发环境的{test[key][0]}为': pre[key][1],}
                    })
        else:
            pre_status = False

        if curTestDict == lis1[len(lis1) - 1] and curPreDict == lis2[len(lis2) - 1]:
            if pre_status == False:
                # noSameKey.append({f'地区{sgin_test}编码标记2测试已配，预发、生产环境未配置!'})
                print('预发环境未配置')

    # noSameKey = remove_duplicates(noSameKey)
    print(noSameKey)

compar_dic(tmpLis1, tmpLis2)
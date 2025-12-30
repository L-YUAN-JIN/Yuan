// ==================== 隐私政策功能 ====================

// 检查用户是否已同意隐私政策
function checkPrivacyPolicy() {
    // 强制显示弹窗进行测试（完成后可以去掉注释）
    localStorage.removeItem('privacyAccepted');

    if (!localStorage.getItem('privacyAccepted')) {
        showPrivacyPolicy();
    }
}

// 显示隐私政策弹窗
function showPrivacyPolicy() {
    const privacyHtml = `
        <div id="privacy-modal" class="privacy-modal">
            <div class="privacy-content">
                <h2><i class="fas fa-shield-alt"></i> 隐私政策声明</h2>
                <div class="privacy-text">
                    <p><strong>重要提示：</strong>本心理健康测试工具仅供个人参考使用，不能替代专业医疗诊断。</p>
                    
                    <h3>数据隐私说明</h3>
                    <ol>
                        <li>所有测试数据仅存储在您的浏览器本地，不会上传到任何服务器</li>
                        <li>我们不会收集、存储或分享您的个人信息</li>
                        <li>测试结果仅供您个人参考，不会用于任何商业用途</li>
                        <li>刷新或关闭页面后，所有测试数据将被清除</li>
                    </ol>
                    
                    <h3>免责声明</h3>
                    <p>本测试结果仅作为心理健康状况的初步评估参考，不能作为医学诊断依据。如有需要，请咨询专业心理健康服务提供者。</p>
                    
                    <h3>使用同意</h3>
                    <p>继续使用即表示您已阅读并同意以上隐私政策。</p>
                </div>
                <div class="privacy-buttons">
                    <button id="accept-privacy" class="privacy-btn accept-btn">
                        <i class="fas fa-check-circle"></i> 我同意并开始测试
                    </button>
                    <button id="decline-privacy" class="privacy-btn decline-btn">
                        <i class="fas fa-times-circle"></i> 不同意并离开
                    </button>
                </div>
            </div>
        </div>
    `;

    // 清除可能存在的旧弹窗
    const existingModal = document.getElementById('privacy-modal');
    if (existingModal) {
        existingModal.remove();
    }

    document.body.insertAdjacentHTML('beforeend', privacyHtml);

    // 添加事件监听
    document.getElementById('accept-privacy').addEventListener('click', function() {
        localStorage.setItem('privacyAccepted', 'true');
        const modal = document.getElementById('privacy-modal');
        if (modal) {
            modal.remove();
        }
        console.log('隐私政策已接受');
    });

    document.getElementById('decline-privacy').addEventListener('click', function() {
        // 可以跳转到其他页面或关闭窗口
        window.location.href = 'about:blank';
    });
}

// ==================== 量表数据 ====================

// 定义SAS量表数据
const sasQuestions = [
    { id: 1, text: "我觉得比平时容易紧张或着急" },
    { id: 2, text: "我无缘无故在感到害怕" },
    { id: 3, text: "我容易心里烦乱或感到惊恐" },
    { id: 4, text: "我觉得我可能将要发疯" },
    { id: 5, text: "我觉得一切都很好", reverse: true },
    { id: 6, text: "我手脚发抖打颤" },
    { id: 7, text: "我因为头疼、颈痛和背痛而苦恼" },
    { id: 8, text: "我觉得容易衰弱和疲乏" },
    { id: 9, text: "我觉得心平气和，并且容易安静坐着", reverse: true },
    { id: 10, text: "我觉得心跳得很快" },
    { id: 11, text: "我因为一阵阵头晕而苦恼" },
    { id: 12, text: "我有晕倒发作，或觉得要晕倒似的" },
    { id: 13, text: "我吸气呼气都感到很容易", reverse: true },
    { id: 14, text: "我的手脚麻木和刺痛" },
    { id: 15, text: "我因为胃痛和消化不良而苦恼" },
    { id: 16, text: "我常常要小便" },
    { id: 17, text: "我的手脚常常是干燥温暖的", reverse: true },
    { id: 18, text: "我脸红发热" },
    { id: 19, text: "我容易入睡并且一夜睡得很好", reverse: true },
    { id: 20, text: "我作恶梦" }
];

// 定义SDS量表数据
const sdsQuestions = [
    { id: 1, text: "我觉得闷闷不乐，情绪低沉" },
    { id: 2, text: "我觉得一天之中早晨最好", reverse: true },
    { id: 3, text: "我一阵阵哭出来或觉得想哭" },
    { id: 4, text: "我夜间睡眠不好" },
    { id: 5, text: "我吃饭像平时一样多", reverse: true },
    { id: 6, text: "与异性亲密接触时和以往一样感觉愉快", reverse: true },
    { id: 7, text: "我感觉体重在减轻" },
    { id: 8, text: "我有便秘的烦恼" },
    { id: 9, text: "我心跳比平时快" },
    { id: 10, text: "我无缘无故地感到疲乏" },
    { id: 11, text: "我的头脑跟平常一样清楚", reverse: true },
    { id: 12, text: "我觉得经常做的事情并不困难", reverse: true },
    { id: 13, text: "我觉得不安，难以保持平静" },
    { id: 14, text: "我对未来感到有希望", reverse: true },
    { id: 15, text: "我比平时更容易生气激动" },
    { id: 16, text: "我觉得作出决定是容易的", reverse: true },
    { id: 17, text: "我觉得自己是个有用的人，有人需要我", reverse: true },
    { id: 18, text: "我的生活过得很有意思", reverse: true },
    { id: 19, text: "假若我死了别人会过得更好" },
    { id: 20, text: "平常感兴趣的事，我仍然感兴趣", reverse: true }
];

// 答案选项
const answerOptions = [
    { value: 1, text: "从无" },
    { value: 2, text: "有时" },
    { value: 3, text: "经常" },
    { value: 4, text: "持续" }
];

// ==================== 初始化函数 ====================

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载，开始初始化...');

    // 首先检查隐私政策
    checkPrivacyPolicy();

    // 生成SAS问题
    generateQuestions('sas', sasQuestions);

    // 生成SDS问题
    generateQuestions('sds', sdsQuestions);

    // 添加量表切换事件
    document.querySelectorAll('.test-btn').forEach(button => {
        button.addEventListener('click', function() {
            const testType = this.getAttribute('data-test');
            switchTest(testType);
        });
    });

    // 添加计算得分事件
    document.getElementById('calculate-sas').addEventListener('click', function() {
        calculateScore('sas', sasQuestions);
    });

    document.getElementById('calculate-sds').addEventListener('click', function() {
        calculateScore('sds', sdsQuestions);
    });

    // 添加重置事件
    document.getElementById('reset-sas').addEventListener('click', function() {
        resetTest('sas');
    });

    document.getElementById('reset-sds').addEventListener('click', function() {
        resetTest('sds');
    });

    console.log('初始化完成');
});

// ==================== 核心功能函数 ====================

// 生成问题HTML
function generateQuestions(scaleType, questions) {
    const container = document.getElementById(`${scaleType}-questions`);
    if (!container) {
        console.error(`找不到容器: ${scaleType}-questions`);
        return;
    }

    container.innerHTML = '';

    questions.forEach(question => {
        const questionItem = document.createElement('div');
        questionItem.className = 'question-item';

        const questionText = document.createElement('div');
        questionText.className = 'question-text';
        questionText.innerHTML = `<span class="question-number">${question.id}</span>${question.text}`;

        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';

        // 生成选项
        answerOptions.forEach(option => {
            const optionItem = document.createElement('div');
            optionItem.className = 'option-item';

            const optionId = `${scaleType}-q${question.id}-option${option.value}`;

            const optionLabel = document.createElement('label');
            optionLabel.className = 'option-label';
            optionLabel.setAttribute('for', optionId);

            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.className = 'option-input';
            optionInput.name = `${scaleType}-q${question.id}`;
            optionInput.id = optionId;
            optionInput.value = option.value;

            const optionText = document.createElement('span');
            optionText.className = 'option-text';
            optionText.textContent = option.text;

            // 添加选择事件
            optionInput.addEventListener('change', function() {
                // 移除所有选项的选中样式
                const labels = optionLabel.parentElement.parentElement.querySelectorAll('.option-label');
                labels.forEach(label => {
                    label.classList.remove('selected');
                });

                // 添加当前选项的选中样式
                optionLabel.classList.add('selected');
            });

            optionLabel.appendChild(optionInput);
            optionLabel.appendChild(optionText);
            optionItem.appendChild(optionLabel);
            optionsContainer.appendChild(optionItem);
        });

        questionItem.appendChild(questionText);
        questionItem.appendChild(optionsContainer);
        container.appendChild(questionItem);
    });
}

// 切换量表
function switchTest(testType) {
    // 更新按钮状态
    document.querySelectorAll('.test-btn').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelector(`.test-btn[data-test="${testType}"]`).classList.add('active');

    // 切换量表显示
    document.querySelectorAll('.scale-container').forEach(container => {
        container.classList.remove('active');
    });
    document.getElementById(`${testType}-scale`).classList.add('active');

    // 隐藏之前的结果
    document.getElementById(`${testType === 'sas' ? 'sds' : 'sas'}-result`).style.display = 'none';
}

// 计算得分
function calculateScore(scaleType, questions) {
    let totalScore = 0;
    let allAnswered = true;

    // 计算总分
    questions.forEach(question => {
        const selectedOption = document.querySelector(`input[name="${scaleType}-q${question.id}"]:checked`);

        if (selectedOption) {
            let score = parseInt(selectedOption.value);

            // 如果是反向计分题，则转换分数
            if (question.reverse) {
                score = 5 - score; // 1→4, 2→3, 3→2, 4→1
            }

            totalScore += score;
        } else {
            allAnswered = false;
        }
    });

    // 检查是否所有题目都已作答
    if (!allAnswered) {
        alert('请完成所有题目后再计算得分！');
        return;
    }

    // 计算标准分（四舍五入取整）
    const standardScore = Math.round(totalScore * 1.25);

    // 显示结果
    displayResult(scaleType, standardScore);
}

// 显示结果（更新版，包含隐私说明）
function displayResult(scaleType, standardScore) {
    const resultContainer = document.getElementById(`${scaleType}-result`);
    if (!resultContainer) {
        console.error(`找不到结果容器: ${scaleType}-result`);
        return;
    }

    let resultText = '';
    let resultColor = '';
    let level = '';

    if (scaleType === 'sas') {
        // SAS结果判断
        if (standardScore < 50) {
            resultText = `根据您的回答，您的焦虑水平在正常范围内。`;
            resultColor = '#2ecc71';
            level = '正常';
        } else if (standardScore >= 50 && standardScore <= 59) {
            resultText = `根据您的回答，您可能存在轻度焦虑。建议您关注自己的情绪状态，适当进行放松和调节。`;
            resultColor = '#f39c12';
            level = '轻度焦虑';
        } else if (standardScore >= 60 && standardScore <= 69) {
            resultText = `根据您的回答，您可能存在中度焦虑。建议您寻求专业心理咨询或与信任的人谈谈您的感受。`;
            resultColor = '#e74c3c';
            level = '中度焦虑';
        } else {
            resultText = `根据您的回答，您可能存在重度焦虑。建议您尽快寻求专业心理健康服务，以获得适当的支持与帮助。`;
            resultColor = '#c0392b';
            level = '重度焦虑';
        }
    } else {
        // SDS结果判断
        if (standardScore < 53) {
            resultText = `根据您的回答，您的抑郁水平在正常范围内。`;
            resultColor = '#2ecc71';
            level = '正常';
        } else if (standardScore >= 53 && standardScore <= 62) {
            resultText = `根据您的回答，您可能存在轻度抑郁。建议您关注自己的情绪变化，尝试进行一些让您感到愉悦的活动。`;
            resultColor = '#f39c12';
            level = '轻度抑郁';
        } else if (standardScore >= 63 && standardScore <= 72) {
            resultText = `根据您的回答，您可能存在中度抑郁。建议您考虑寻求专业心理咨询支持，并与亲友分享您的感受。`;
            resultColor = '#e74c3c';
            level = '中度抑郁';
        } else {
            resultText = `根据您的回答，您可能存在重度抑郁。建议您尽快联系心理健康专业人士，以获得及时的支持和干预。`;
            resultColor = '#c0392b';
            level = '重度抑郁';
        }
    }

    resultContainer.innerHTML = `
        <div class="result-header">
            <i class="fas fa-chart-line" style="color: ${resultColor}"></i>
            <span>测试结果</span>
        </div>
        <div class="result-content">
            <p><strong>标准分：${standardScore}分</strong> | <strong>评估结果：${level}</strong></p>
            <p>${resultText}</p>
            
            <div class="privacy-notice">
                <h4><i class="fas fa-lock"></i> 数据隐私说明</h4>
                <p>本次测试的所有数据仅保存在您的设备本地，我们不会收集或存储任何信息。</p>
                <p>刷新或关闭页面后，您的测试记录将被清除。</p>
            </div>
            
            <div class="medical-disclaimer">
                <h4><i class="fas fa-exclamation-triangle"></i> 重要免责声明</h4>
                <p>此测试结果仅为初步评估，不能替代专业医疗诊断。如果您感到持续的情绪困扰，建议咨询专业心理健康服务提供者。</p>
            </div>
            
            <div class="result-note">
                <i class="fas fa-lightbulb"></i> 提示：定期进行自我情绪评估有助于及时关注心理健康状态。
            </div>
        </div>
    `;

    resultContainer.style.display = 'block';
    resultContainer.style.borderLeft = `4px solid ${resultColor}`;

    // 滚动到结果位置
    resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 重置测试
function resetTest(scaleType) {
    // 清除所有选项
    document.querySelectorAll(`input[name^="${scaleType}-q"]`).forEach(input => {
        input.checked = false;
    });

    // 移除选项的选中样式
    document.querySelectorAll(`#${scaleType}-questions .option-label`).forEach(label => {
        label.classList.remove('selected');
    });

    // 隐藏结果
    document.getElementById(`${scaleType}-result`).style.display = 'none';

    // 滚动到顶部
    document.getElementById(`${scaleType}-scale`).scrollIntoView({ behavior: 'smooth' });
}

// ==================== 页面加载完成后的额外操作 ====================

// 页面完全加载后执行
window.addEventListener('load', function() {
    console.log('页面完全加载完成');

    // 再次检查隐私政策（双重保险）
    setTimeout(() => {
        if (!localStorage.getItem('privacyAccepted')) {
            showPrivacyPolicy();
        }
    }, 500);
});

# 数据 Schema 定义

## data/chapters/chNN.json
```json
{
  "id": "ch01",
  "num": 1,
  "title": "管理概论",
  "intro": "本章在课程中的地位与学习目标（1-2句）",
  "sections": [
    {
      "id": "1.1",
      "title": "管理、管理学和管理者",
      "points": [
        {
          "id": "1.1.1",
          "title": "管理的定义",
          "ppt": "课件原文要点（忠实摘录，保留术语）",
          "plain": "讲成大白话，配生活化例子",
          "exam": "这个知识点怎么考、踩分点、易错点",
          "key": ["必须记住的关键词"],
          "visual": null
        }
      ]
    }
  ]
}
```

## data/questions.json  (数组)
```json
{
  "id": "mcq-001",
  "type": "single" | "judge",
  "stem": "题干",
  "options": [{"key":"A","text":"..."}],
  "answer": "D",
  "explain": "解析",
  "chapter": 1,
  "source": "单项选择题库 | 2017A卷 | 2018A卷 | 2023A卷",
  "answerSource": "official" | "ai"
}
```

## data/short.json (数组)
```json
{
  "id": "s-001",
  "type": "名词解释" | "简答" | "论述",
  "chapter": 3,
  "q": "题目",
  "points": ["踩分点1", "踩分点2"],
  "answer": "完整参考答案",
  "source": "2021答案 | 押题笔记 | PPT"
}
```

## data/calc.json (数组)
```json
{
  "id": "c-001",
  "kind": "decision-tree" | "breakeven" | "uncertainty" | "network",
  "chapter": 9,
  "title": "决策树法",
  "stem": "真题题干",
  "solution": ["步骤1", "步骤2"],
  "answer": "结论",
  "source": "2018A卷"
}
```

## data/cases.json (数组)
```json
{
  "id": "case-001",
  "chapter": 8,
  "title": "科大讯飞扬子鳄事件",
  "material": "案例材料",
  "questions": [{"q":"(1)...", "answer":"参考答案"}],
  "source": "2018A卷"
}
```
